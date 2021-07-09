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
        
        public DbSet<User> Users { get; set; }

        private static void AddWishlistToWishes(WishlistContext context)
        {
            foreach (var wish in context.Wishes)
            {
                foreach (var wishlist in context.Wishlists)
                {
                    if (wish.WishlistId == wishlist.Id)
                    {
                        wish.Wishlist = wishlist;
                    }
                }
            }
        }

        public static void AddTestData(WishlistContext context)
        {

            var user1 = new User
            {
                Id = 1,
                Username = "Agnes"
            };
            
            var user2 = new User
            {
                Id = 2,
                Username = "Kerp"
            };
            
            var wish1 = new Wish
            {
                Id = 1,
                Title = "Bok",
                WishlistId = 1,
                Bought = false

            };

            context.Wishes.Add(wish1);

            var wish2 = new Wish
            {
                Id = 2,
                Title = "Choklad",
                WishlistId = 1,
                Bought = false

            };

            context.Wishes.Add(wish2);

            var wish3 = new Wish
            {
                Id = 3,
                Title = "Marmeladgodis",
                WishlistId = 2,
                Bought = false

            };

            context.Wishes.Add(wish3);

            var wish4 = new Wish
            {
                Id = 4,
                Title = "Visp",
                WishlistId = 2,
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
                Wishes = wishes1,
                User = user1,
                UserId = user1.Id

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
                Wishes = wishes2,
                User = user2,
                UserId = user2.Id
            };

            // Set wishlists to users
            user1.Wishlists = new List<Wishlist> {wishlist1};
            user2.Wishlists = new List<Wishlist> {wishlist2};
            

            context.Wishlists.Add(wishlist2);
            AddWishlistToWishes(context);

            context.SaveChanges();
        }

    }

}
