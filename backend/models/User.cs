using System.Collections.Generic;

namespace backend.models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        
        public ICollection<Wishlist> Wishlists { get; set; }
    }
}