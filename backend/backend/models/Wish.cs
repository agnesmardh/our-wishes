#nullable enable

namespace backend.models

{
    public class Wish
    {
        public Wish(int wishId, string title, User? boughtBy = null, string link = "")
        {
            WishId = wishId;
            Title = title;
            BoughtBy = boughtBy;
            Link = link;
        }
        
        public Wish()
        {
            WishId = default;
            Title = "";
            BoughtBy = null;
            Link = "";
        }

        public int WishId { get; set; }
        public string Title { get; set; }
        public User? BoughtBy { get; set; }
        public string Link { get; set; }
    }
}
