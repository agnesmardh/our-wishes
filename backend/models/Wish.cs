#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models

{
    public class Wish
    {
        public int WishId { get; set; }

        public int WishlistId { get; set; }

        [ForeignKey("WishlistId")]
        public Wishlist Wishlist { get; set; }
        public string Title { get; set; }
        [ForeignKey("UserId")]
        public User? BoughtBy { get; set; }

        public string Link { get; set; }

        public override string ToString()
        {
            return $"{nameof(WishId)}: {WishId}, {nameof(WishlistId)}: {WishlistId}, {nameof(Wishlist)}: {Wishlist}, {nameof(Title)}: {Title}, {nameof(BoughtBy)}: {BoughtBy}";
        }
    }
}
