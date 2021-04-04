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
        public async Task<ActionResult<WishlistDTO>> GetWishlist(int id)
        {
            Console.WriteLine("Hej this is the message");
            var wishlist = await _context.Wishlists.FindAsync(id);
            Console.WriteLine("Hej message");
            Console.WriteLine(wishlist.Wishes);
        
            
            if (wishlist == null)
            {
                return NotFound();
            }

            return WishlistToDTO(wishlist);
        }

        [HttpPost]
        public async Task<ActionResult<WishlistDTO>> CreateWishlist([FromBody] CreateWishlistDTO createWishlist)
        {
            var rng = new Random();
            var ListID = rng.Next();
            var wishlist = new Wishlist
            {
                Title = createWishlist.Title,
                Owner = "Agnes",
                Id = ListID,
                Wishes = new List<Wish>() { new Wish { Id = rng.Next(), Title = "TestWish", Bought = false, ListId = ListID } }
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

        private bool WishlistExists(int id)
        {
            return _context.Wishlists.Any(e => e.Id == id);
        }

        private static WishlistDTO WishlistToDTO(Wishlist wishlist)
        {
            return new WishlistDTO
            {
                Id = wishlist.Id,
                Title = wishlist.Title,
                Owner = wishlist.Owner,
                Wishes = wishlist.Wishes?.Select(wish => WishToDTO(wish)).ToList()
            };
        }

        private static WishDTO WishToDTO(Wish wish) =>
        new WishDTO
        {
            Id = wish.Id,
            Title = wish.Title,
            Bought = wish.Bought
        };

    }
}
