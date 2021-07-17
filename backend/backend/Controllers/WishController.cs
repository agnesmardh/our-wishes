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
    public class WishController : BaseController
    {
        public WishController(WishlistContext context) : base(context)
        {
        }
        
        [HttpPost]
        public async Task<ActionResult<WishDto>> CreateWish([FromBody] WishDto.CreateWishDto createWish)
        {
            var user = await GetCurrentUser();
            
            var listId = createWish.WishlistId;
            
            var wishlist = _context.Wishlists.FirstOrDefault(x => x.WishlistId == listId);
            if (wishlist == null)
            {
                return BadRequest("Wishlist does not exist");
            }
            
            var isOwner = _context.Wishlists.Any(x => x.WishlistId == listId && x.Owner == user);

            if (!isOwner)
            {
                return Unauthorized();
            }

            var rng = new Random();
            var wishId = rng.Next();

            var wish = new Wish(title: createWish.Title, link: createWish.Link, wishId: wishId);
            

            _context.Wishes.Add(wish);
            wishlist.Wishes.Add(wish);

                await _context.SaveChangesAsync();
            
            return WishDto.ToDto(wish);
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

            var wishlist = _context.Wishlists
                .Include(w => w.Wishes)
                .FirstOrDefault(wishlist1 => wishlist1.Wishes.Any(wish1 => wish1.WishId == id));
            
            var user = await GetCurrentUser();
            var isOwner = wishlist?.Owner.UserId == user.UserId;

            if (!isOwner)
            {
                return Unauthorized();
            }
            
            _context.Wishes.Remove(wish);
            wishlist?.Wishes.Remove(wish);
            
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
