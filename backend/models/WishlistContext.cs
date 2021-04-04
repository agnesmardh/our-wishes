using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace backend.models
{
    public class WishlistContext : DbContext
    {
        public WishlistContext(DbContextOptions<WishlistContext> options)
            : base(options)
        {
        }

        public DbSet<Wishlist> Wishlists { get; set; }

        public DbSet<Wish> Wishes { get; set; }

        public static void AddTestData(WishlistContext context)
        {
            var wish1 = new Wish
            {
                Id = 1,
                Title = "Bok",
                ListId = 1,
                Bought = false

            };

            context.Wishes.Add(wish1);

            var wish2 = new Wish
            {
                Id = 2,
                Title = "Choklad",
                ListId = 1,
                Bought = false

            };

            context.Wishes.Add(wish2);

            var wish3 = new Wish
            {
                Id = 3,
                Title = "Marmeladgodis",
                ListId = 2,
                Bought = false

            };

            context.Wishes.Add(wish3);

            var wish4 = new Wish
            {
                Id = 4,
                Title = "Visp",
                ListId = 2,
                Bought = false

            };

            context.Wishes.Add(wish4);

            var wishes1 = new List<Wish>
            {
                wish1,
                wish2
            };
            var wishlist1 = new Wishlist
            {
                Id = 1,
                Title = "Examenspresent",
                Owner = "Agnes",
                Wishes = wishes1

            };

            context.Wishlists.Add(wishlist1);

            var wishes2 = new List<Wish>
            {
                wish3,
                wish4
            };

            var wishlist2 = new Wishlist
            {
                Id = 2,
                Title = "Jul 2021",
                Owner = "Mattias",
                Wishes = wishes2
            };

            context.Wishlists.Add(wishlist2);

            context.SaveChanges();
        }

    }

}
