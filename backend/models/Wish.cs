#nullable enable

namespace backend.models

{
    public class Wish
    {
        public Wish(int wishId, string title, UserDto? boughtBy = null, string link = "")
        {
            WishId = wishId;
            Title = title;
            BoughtBy = boughtBy;
            Link = link;
        }

        public int WishId { get; set; }
        public string Title { get; set; }
        public UserDto? BoughtBy { get; set; }
        public string Link { get; set; }
    }
}
