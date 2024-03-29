﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.models
{
    public class WishlistDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserDto Owner { get; set; }
        public ICollection<WishDto> Wishes { get; set; }
        public bool Archived { get; set; }
        public DateTime Deadline { get; set; }
        public string ShareableLink { get; set; }

        public static WishlistDto ToDto(Wishlist wishlist)
        {
            return new WishlistDto
            {
                Id = wishlist.WishlistId,
                Title = wishlist.Title,
                Owner = UserDto.ToDto(wishlist.Owner),
                Wishes = wishlist.Wishes?.Select(WishDto.ToDto).ToList(),
                Archived = wishlist.Archived,
                Deadline = wishlist.Deadline,
                ShareableLink = wishlist.ShareableLink
            };
        }
    }

    public class CreateWishlistDto
    {
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
    }
}
