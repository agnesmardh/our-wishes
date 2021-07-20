using System.Security.Claims;
using System.Threading.Tasks;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class BaseController : Controller
    {
        protected readonly WishlistContext _context;

        public BaseController(WishlistContext context)
        {
            _context = context;
        }
        
        public async Task<User> GetCurrentUser()
        {
            var userId = GetUserId();
            var user = await _context.Users.FindAsync(userId);
            return user;
        }

        public string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

    }
}