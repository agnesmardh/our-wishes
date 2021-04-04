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
        private readonly WishlistContext _context;

        public WishController(WishlistContext context)
        {
            _context = context;
        }

        private static WishDTO ItemToDTO(Wish wish) =>
        new WishDTO
        {
            Id = wish.Id,
            Title = wish.Title,
            Bought = wish.Bought
        };


        [HttpPut("{id}")]
        public async Task<IActionResult> AddWish(int id, string title)
        {
            var rng = new Random();
            Wish wishToAdd = new Wish { Title = title, Id = rng.Next(), Bought = false, ListId = id };
            _context.Wishes.Add(wishToAdd);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public ActionResult<WishDTO> GetWish(int id)
        {
            var wish = _context.Wishes.First((w) => w.Id == id);

            if (wish == null)
            {
                return NotFound();
            }

            return ItemToDTO(wish);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWish(int id)
        {
            var wish = await _context.Wishes.FindAsync(id);

            if (wish == null)
            {
                return NotFound();
            }

            _context.Wishes.Remove(wish);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
