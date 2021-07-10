#nullable enable
namespace backend.models
{
    public class WishDto
    {
        public WishDto(int id, string title, UserDto? boughtBy = null, string link = "")
        {
            Id = id;
            Title = title;
            BoughtBy = boughtBy;
            Link = link;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public UserDto? BoughtBy { get; set; }
        public string Link { get; set; }
        public static WishDto ToDto(Wish wish)
        {
            return new(wish.WishId, wish.Title, wish.BoughtBy, wish.Link);
        }
    }
}
