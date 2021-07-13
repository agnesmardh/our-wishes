using System;
using System.Linq;
using System.Security.Claims;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Xunit.Abstractions;

namespace Tests
{
    public class WishlistControllerTest
    {

        private static string testUserId = "68b96e05-e6e0-4a66-b33b-28c1b189f3e8";

        private static WishlistContext GetContext()
        {
            var options = new DbContextOptionsBuilder<WishlistContext>()
                .UseInMemoryDatabase(databaseName: "testWishlistDb")
                .Options;

            // Insert seed data into the database using one instance of the context
            var context = new WishlistContext(options);
            WishlistContext.AddTestData(context);
            context.SaveChanges();
            
            return context;
        }

        private static void MockAuth(WishlistController controller)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, testUserId),
                new Claim(ClaimTypes.Name, "kerp@somecompany.com")
            },"TestAuthentication"));

            controller.ControllerContext = new ControllerContext {HttpContext = new DefaultHttpContext {User = user}};
        }

        [Fact]
        public void TestContext()
        {
            var context = GetContext();
            Assert.Equal(2, context.Wishlists.Count());
        }

        [Fact]
        public void DeleteWishlist()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);

            var countBefore = context.Wishlists.Count();
            
            controller.DeleteWishlist(1);
            
            var countAfter = context.Wishlists.Count();
            
            Assert.False(context.Wishlists.Any(x => x.WishlistId == 1));
            Assert.Equal(countBefore, countAfter + 1);
        }

        [Fact]
        public void GetWishlist()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);

            var wishlists = controller.GetWishlists();

            var wishlistDtos = wishlists as WishlistDto[] ?? wishlists.ToArray();
            var isUsersWishlists = wishlistDtos.All(x => x.Owner.Id == testUserId);
            
            Assert.True(isUsersWishlists);
            Assert.True(wishlistDtos.Any());
        }

        [Fact]
        public void CreateWishlist()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);

            var wishlistToCreate = new CreateWishlistDto() {Deadline = new DateTime(2021, 12, 24), Title = "testWish"};

            var countBefore = context.Wishlists.Count();
            
            controller.CreateWishlist(wishlistToCreate);
            
            Assert.Equal(context.Wishlists.Count(), countBefore + 1);
        }
    }
}
