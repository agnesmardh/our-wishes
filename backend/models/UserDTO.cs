using System.Collections.Generic;

namespace backend.models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        
        public ICollection<WishlistDTO> Wishlists { get; set; }
    }
}