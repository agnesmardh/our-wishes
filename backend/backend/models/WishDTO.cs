﻿#nullable enable
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
            return new(wish.WishId, wish.Title, UserDto.ToDto(wish.BoughtBy), wish.Link);
        }
        
        public class CreateWishDto
        {
            public CreateWishDto(string title, string link, int wishlistId)
            {
                Title = title;
                Link = link;
                WishlistId = wishlistId;
            }

            public string Title { get; set; }
            public string Link { get; set; }
            public int WishlistId { get; set; }
            
        }
    }
}
