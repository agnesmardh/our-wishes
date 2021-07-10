#nullable enable

namespace backend.models

{
    public class Wish
    {
        public int WishId { get; set; }
        public string Title { get; set; }
        public User? BoughtBy { get; set; }
        public string Link { get; set; }
    }
}
