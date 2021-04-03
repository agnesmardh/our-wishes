using System;
using Microsoft.EntityFrameworkCore;
using backend.models;
namespace backend.models
{
    public class WishlistContext : DbContext
    {
        public WishlistContext(DbContextOptions<WishlistContext> options)
            : base(options)
        {
        }

        public DbSet<Wishlist> Wishlists { get; set; }

        //public DbSet<Wish> Wishes { get; set; }
    }
}
