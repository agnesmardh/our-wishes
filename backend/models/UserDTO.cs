using System.Collections.Generic;
using System.Linq;

namespace backend.models
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Email { get; set; }
        
        public ICollection<WishlistDto> Wishlists { get; set; }
        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                Id = user.UserId,
                Username = user.Username,
                Wishlists = user.Wishlists?.Select(WishlistDto.ToDto).ToList()
            };
        }
    }
}
