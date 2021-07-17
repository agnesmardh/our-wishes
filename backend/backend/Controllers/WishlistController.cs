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
    public class WishlistController : BaseController
    {
        public WishlistController(WishlistContext context) : base(context)
        {
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishlistDto>> GetWishlist(int id)
        {
            var wishlist = await _context.Wishlists.Include(x => x.Wishes).SingleOrDefaultAsync(x => x.WishlistId == id);

            if (wishlist == null)
            {
                return NotFound();
            }

            return WishlistDto.ToDto(wishlist);
        }
        
        [HttpGet]
        public IEnumerable<WishlistDto> GetWishlists()
        {
            var userId = GetUserId();
            var wishlists = _context.GetWishlistsByOwnerId(userId);
            var wishlistsDto = wishlists.ToList().Select(WishlistDto.ToDto);

            return wishlistsDto;
        }

        [HttpPost]
        public async Task<ActionResult<WishlistDto>> CreateWishlist([FromBody] CreateWishlistDto createWishlist)
        {
            var user = await GetCurrentUser();

            var rng = new Random();
            var listId = rng.Next();
            var wishlist = new Wishlist
            {
                Title = createWishlist.Title,
                Owner = user,
                WishlistId = listId,
                Wishes = new List<Wish>()
                {
                    new Wish(rng.Next(), "Testwish", null, "")
                },
                Archived = false,
                Deadline = createWishlist.Deadline,
                ShareableLink = ""
            };

            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return WishlistDto.ToDto(wishlist);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlist(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);

            if (wishlist.Owner.UserId != GetUserId())
            {
                return Unauthorized();
            }

            if (wishlist == null)
            {
                return NotFound();
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
