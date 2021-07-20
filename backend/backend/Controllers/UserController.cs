using System.Linq;
using System.Threading.Tasks;
using backend.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    
    public class UserController : BaseController
    {
        public UserController(WishlistContext context) : base(context)
        {
        }
        
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserDto.CreateUserDto createUserDto)
        {
            var user = new User()
            {
                Email = createUserDto.Email,
                Username = createUserDto.Username,
                UserId = createUserDto.Id
            };
            
            _context.Users.Add(user);

            await _context.SaveChangesAsync();
            
            return UserDto.ToDto(user);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(string id)
        {
            var userAuth = await GetCurrentUser();

            if (userAuth.UserId != id)
            {
                return Unauthorized();
            }

            var user = _context.Users.First(u => u.UserId == id);
            
            if (user == null)
            {
                return NotFound();
            }

            return UserDto.ToDto(user);
        }
    }
}