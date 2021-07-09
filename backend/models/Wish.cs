using System;
namespace backend.models

{
    public class Wish
    {
        public int Id { get; set; }

        public int WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }
        public string Title { get; set; }
        public bool Bought { get; set; }

        public override string ToString()
        {
            return $"{nameof(Id)}: {Id}, {nameof(WishlistId)}: {WishlistId}, {nameof(Title)}: {Title}, {nameof(Bought)}: {Bought}";
        }
    }
}
