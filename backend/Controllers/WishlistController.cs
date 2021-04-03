using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly WishlistContext _context;

        public WishlistController(WishlistContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wishlist>> GetWishlist(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);

            if (wishlist == null)
            {
                return NotFound();
            }

            return wishlist;
        }

        [HttpPost]
        public async Task<ActionResult<WishlistDTO>> CreateWishlist(string title)
        {
            var rng = new Random();
            var wishlist = new Wishlist
            {
                Title = title,
                Owner = "Agnes",
                Id = rng.Next()
            };

            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetWishlist),
                new { id = wishlist.Id },
                WishlistToDTO(wishlist));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlist(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);

            if (wishlist == null)
            {
                return NotFound();
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // get all wishes for wishlist
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<WishDTO>>> GetWishes(int id)
        {
            return await _context.Wishes.Where(w => w.ListId == id)
                .Select(x => WishToDTO(x))
                .ToListAsync();
        }*/

        private bool WishlistExists(int id) =>
            _context.Wishlists.Any(e => e.Id == id);

        private static WishlistDTO WishlistToDTO(Wishlist wishlist) =>
        new WishlistDTO
        {
            Id = wishlist.Id,
            Title = wishlist.Title,
            Owner = wishlist.Owner
        };

        private static WishDTO WishToDTO(Wish wish) =>
        new WishDTO
        {
            Id = wish.Id,
            Title = wish.Title,
            Bought = wish.Bought
        };

    }
}
