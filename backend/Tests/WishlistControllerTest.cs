using System;
using System.Linq;
using System.Security.Claims;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class WishlistControllerTest : IDisposable
    {

        private static WishlistContext _context;
        private static string testUserId = "1";

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
        
        private static WishlistContext GetContext()
        {
            var options = new DbContextOptionsBuilder<WishlistContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new WishlistContext(options);
            WishlistContext.AddTestData(_context);
            _context.SaveChanges();
            
            return _context;
        }

        private static void MockAuth(WishlistController controller)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, testUserId),
                new Claim(ClaimTypes.Name, "test@somecompany.com")
            },"TestAuthentication"));

            controller.ControllerContext = new ControllerContext {HttpContext = new DefaultHttpContext {User = user}};
        }

        [Fact]
        public async void DeleteWishlist()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);
            
            const int wishlistIdToDelete = 1;

            var countBefore = context.Wishlists.Count();

            await controller.DeleteWishlist(wishlistIdToDelete);
            
            var countAfter = context.Wishlists.Count();
            
            Assert.False(context.Wishlists.Any(x => x.WishlistId == wishlistIdToDelete));
            Assert.Equal(countBefore, countAfter + 1);
        }
        
        [Fact]
        public async void DeleteWishlistNotPossibleIfNotOwner()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);
            
            // Wishlist user with id 1 isn't the owner of
            const int wishlistIdToDelete = 2;

            var countBefore = context.Wishlists.Count();

            var res = await controller.DeleteWishlist(wishlistIdToDelete);
            var statusResult = res as UnauthorizedResult;
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status401Unauthorized);
            
            var countAfter = context.Wishlists.Count();

            Assert.True(context.Wishlists.Any(x => x.WishlistId == wishlistIdToDelete));
            Assert.Equal(countBefore, countAfter);
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
        public async void CreateWishlist()
        {
            var context = GetContext();
            var controller = new WishlistController(context);
            MockAuth(controller);

            var wishlistToCreate = new CreateWishlistDto() {Deadline = new DateTime(2021, 12, 24), Title = "testWish"};

            var countBefore = context.Wishlists.Count();
            
            await controller.CreateWishlist(wishlistToCreate);

            Assert.Equal(context.Wishlists.Count(), countBefore + 1);
        }
        
    }
}
