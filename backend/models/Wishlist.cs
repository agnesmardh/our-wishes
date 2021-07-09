using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    public class Wishlist
    {
        public int WishlistId { get; set; }
        public string Title { get; set; }


        public string OwnerId { get; set; }
        [ForeignKey("UserId")]
        public User Owner { get; set; }

        // [ForeignKey("UserId")]
        // public ICollection<User> UsersSharedWith { get; set; }

        public ICollection<Wish> Wishes { get; set; }

        public bool Archived { get; set; }
        public DateTime Deadline { get; set; }
        public string ShareableLink { get; set; }

        public override string ToString()
        {
            return $"{nameof(WishlistId)}: {WishlistId}, {nameof(Title)}: {Title}, {nameof(OwnerId)}: {OwnerId}, {nameof(Owner)}: {Owner}, {nameof(Wishes)}: {Wishes}, {nameof(Archived)}: {Archived}, {nameof(Deadline)}: {Deadline}, {nameof(ShareableLink)}: {ShareableLink}";
        }
    }
}
