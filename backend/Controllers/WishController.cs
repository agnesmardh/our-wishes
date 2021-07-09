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

        [HttpPut("{id}")]
        public async Task<IActionResult> AddWish(int id, string title)
        {
            var rng = new Random();
            Wish wishToAdd = new Wish { Title = title, WishId = rng.Next(), BoughtBy = null, WishlistId = id };
            _context.Wishes.Add(wishToAdd);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public ActionResult<WishDto> GetWish(int id)
        {
            var wish = _context.Wishes.First((w) => w.WishId == id);

            if (wish == null)
            {
                return NotFound();
            }

            return WishDto.ToDto(wish);
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
