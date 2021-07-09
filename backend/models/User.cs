using System.Collections.Generic;

namespace backend.models
{
    public class User
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Email { get; set; }
        
        public ICollection<Wishlist> Wishlists { get; set; }

        // [ForeignKey("WishlistId")]
        // public ICollection<Wishlist> WishlistSharedWithMe { get; set; }
    }
}
