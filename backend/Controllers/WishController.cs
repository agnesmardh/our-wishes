using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.models;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WishController : ControllerBase
    {
        private static readonly int ListId = 1;

        private static List<Wish> Wishes = new List<Wish>
        {
            new Wish{Id = 5, Title =  "Gameboy", Bought = false, ListId = ListId }, new Wish{Id = 7, Title =  "Bok", Bought = false, ListId = ListId }, new Wish{Id = 24, Title =  "Marmeladgodis", Bought = false, ListId = ListId }
        };

        private readonly ILogger<WishController> _logger;

        public WishController(ILogger<WishController> logger)
        {
            _logger = logger;
        }

        private static WishDTO ItemToDTO(Wish wish) =>
        new WishDTO
        {
            Id = wish.Id,
            Title = wish.Title,
            Bought = wish.Bought
        };

        /*[HttpGet("{id}")]
        public ActionResult<IEnumerable<WishDTO>> GetWishes(int id)
        {
            if (id != ListId)
            {
                return NotFound();
            }
            var result = Wishes.Where(w => w.ListId == id).Select(w => ItemToDTO(w));

            return result.ToArray();
        }*/

        [HttpPut("{id}")]
        public ActionResult<WishDTO> AddWish(int id, string title)
        {
            if (id != ListId)
            {
                return BadRequest();
            }
            var rng = new Random();
            Wish wishToAdd = new Wish { Title = title, Id = rng.Next(), Bought = false, ListId = id };
            Wishes.Add(wishToAdd);

            return NoContent();
        }

        [HttpGet("{id}")]
        public ActionResult<WishDTO> GetWish(int id)
        {
            var wish = Wishes.First((w) => w.Id == id);

            if (wish == null)
            {
                return NotFound();
            }

            return ItemToDTO(wish);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWish(int id)
        {
            var wish = Wishes.First((w) => w.Id == id);
            if (wish == null)
            {
                return NotFound();
            }

            Wishes.Remove(wish);

            return NoContent();
        }
    }
}
