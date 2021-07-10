#nullable enable
namespace backend.models
{
    public class WishDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserDto? BoughtBy { get; set; }
        public string Link { get; set; }
        public static WishDto ToDto(Wish wish)
        {
            return new WishDto
            {
                Id = wish.WishId,
                Title = wish.Title,
                BoughtBy = UserDto.ToDto(wish.BoughtBy),
                Link = wish.Link
            };
        }
    }
}
