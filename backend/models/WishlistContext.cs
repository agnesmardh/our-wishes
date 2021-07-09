using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace backend.models
{
    public class WishlistContext : DbContext
    {
        public WishlistContext(DbContextOptions<WishlistContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public DbSet<Wishlist> Wishlists { get; set; }

        public DbSet<Wish> Wishes { get; set; }
        
        public DbSet<User> Users { get; set; }

        public IEnumerable<Wishlist> GetWishlistsByOwnerId(string ownerId)
        {
            return  Users.Where((user) => user.UserId == ownerId)
                .Include(x => x.Wishlists)
                .ThenInclude(x => x.Wishes)
                .ThenInclude(x => x.BoughtBy)
                .First().Wishlists;

        }

        private static void AddWishlistToWishes(WishlistContext context)
        {
            foreach (var wish in context.Wishes)
            {
                foreach (var wishlist in context.Wishlists)
                {
                    if (wish.WishlistId == wishlist.WishlistId)
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
                UserId = "1",
                Username = "Agnes",
                Email = "email",
                FirstName = "Agnes",
                LastName = "Mårdh",
                ProfileImageUrl = ""
            };
            
            var user2 = new User
            {
                UserId = "68b96e05-e6e0-4a66-b33b-28c1b189f3e8",
                Username = "Kerp",
                Email = "email",
                FirstName = "Mattias",
                LastName = "Nilsen",
                ProfileImageUrl = ""
            };
            
            var wish1 = new Wish
            {
                WishId = 1,
                Title = "Bok",
                WishlistId = 1,
                BoughtBy = null,
                Link = ""

            };

            context.Wishes.Add(wish1);

            var wish2 = new Wish
            {
                WishId = 2,
                Title = "Choklad",
                WishlistId = 1,
                BoughtBy = null,
                Link = "",


            };

            context.Wishes.Add(wish2);

            var wish3 = new Wish
            {
                WishId = 3,
                Title = "Marmeladgodis",
                WishlistId = 2,
                BoughtBy = null,
                Link = ""

            };

            context.Wishes.Add(wish3);

            var wish4 = new Wish
            {
                WishId = 4,
                Title = "Visp",
                WishlistId = 2,
                BoughtBy = null,
                Link = ""

            };

            context.Wishes.Add(wish4);

            var wishes1 = new List<Wish>
            {
                wish1,
                wish2
            };
            var wishlist1 = new Wishlist
            {
                WishlistId = 1,
                Title = "Examenspresent",
                Wishes = wishes1,
                Owner = user1,
                OwnerId = user1.UserId,
                Archived = false,
                Deadline = new DateTime(2021, 12, 24),
                ShareableLink = ""

            };

            context.Wishlists.Add(wishlist1);

            var wishes2 = new List<Wish>
            {
                wish3,
                wish4
            };

            var wishlist2 = new Wishlist
            {
                WishlistId = 2,
                Title = "Jul 2021",
                Wishes = wishes2,
                Owner = user2,
                OwnerId = user2.UserId,
                Archived = false,
                Deadline = new DateTime(2021, 12, 24),
                ShareableLink = ""
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
