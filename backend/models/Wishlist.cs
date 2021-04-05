using System;
using System.Collections.Generic;

namespace backend.models
{
    public class Wishlist
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Owner { get; set; }
        public ICollection<Wish> Wishes { get; set; }

        // Invited users?

    }
}
