using System;
using System.Collections.Generic;

namespace backend.models
{
    public class WishlistDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Owner { get; set; }
        public ICollection<WishDTO> Wishes { get; set; }

        // Invited users?
    }

    public class CreateWishlistDTO
    {
        public string Title { get; set; }
    }
}
