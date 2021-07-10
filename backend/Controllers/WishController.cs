using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
            var wishToAdd = new Wish(rng.Next(), title, null, "");
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
