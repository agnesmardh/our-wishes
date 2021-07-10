using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        public async Task<ActionResult<WishlistDto>> GetWishlist(int id)
        {
            var wishlist = await _context.Wishlists.Include(x => x.Wishes).SingleOrDefaultAsync(x => x.WishlistId == id);
            //TODO check why this cant be null
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
                    new Wish
                    {
                        WishId = rng.Next(),
                        Title = "TestWish",
                        BoughtBy = null,
                    }
                },
                Archived = false,
                Deadline = new DateTime(2021, 12, 24),
                ShareableLink = ""
            };

            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetWishlist),
                new { id = wishlist.WishlistId },
                WishlistDto.ToDto(wishlist));
        }

        private async Task<User> GetCurrentUser()
        {
            var userId = GetUserId();
            var user = await _context.Users.FindAsync(userId);
            return user;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
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
            return _context.Wishlists.Any(e => e.WishlistId == id);
        }

    }
}
