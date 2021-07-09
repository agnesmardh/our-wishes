using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
            var wishlist = await _context.Wishlists.Include(x => x.Wishes).SingleOrDefaultAsync(x => x.Id == id);
            //TODO check why this cant be null
            if (wishlist == null)
            {
                return NotFound();
            }

            return WishlistToDTO(wishlist);
        }
        
        [HttpGet]
        public IEnumerable<WishlistDTO> GetWishlists()
        {
            var wishlists = _context.Wishlists.Include(x => x.Wishes);

            var wishlistsDto = wishlists.ToList().Select(WishlistToDTO);

            return wishlistsDto;
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
                Wishes = new List<Wish>() { new Wish { Id = rng.Next(), Title = "TestWish", Bought = false, WishlistId = ListID } }
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

        private static UserDTO UserToDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Wishlists = user.Wishlists?.Select(wishlist => WishlistToDTO(wishlist)).ToList()
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
