#nullable enable
namespace backend.models
{
    public class WishDto
    {
        public int Id { get; set; }

        public int WishlistId { get; set; }

        public WishlistDto Wishlist { get; set; }
        public string Title { get; set; }
        public UserDto? BoughtBy { get; set; }

        public string Link { get; set; }

        public static WishDto ToDto(Wish wish)
        {
            return new WishDto
            {
                Id = wish.WishId,
                Title = wish.Title,
                BoughtBy = UserDto.ToDto(wish.BoughtBy)
            };
        }

        public override string ToString()
        {
            return $"{nameof(Id)}: {Id}, {nameof(WishlistId)}: {WishlistId}, {nameof(Wishlist)}: {Wishlist}, {nameof(Title)}: {Title}, {nameof(BoughtBy)}: {BoughtBy}";
        }
    }
}
