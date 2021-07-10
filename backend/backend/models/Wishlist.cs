using System;
using System.Collections.Generic;

namespace backend.models
{
    public class Wishlist
    {
        public int WishlistId { get; set; }
        public string Title { get; set; }
        public User Owner { get; set; }
        public ICollection<Wish> Wishes { get; set; }
        public bool Archived { get; set; }
        public DateTime Deadline { get; set; }
        public string ShareableLink { get; set; }
    }
}
