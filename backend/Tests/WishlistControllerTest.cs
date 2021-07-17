using System;
using System.Linq;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [Fact]
        public async void DeleteWishlist()
        {
            _context = TestUtils.GetContext();
            var controller = new WishlistController(_context);
            TestUtils.MockAuth(controller, testUserId);
            
            const int wishlistIdToDelete = 1;

            var countBefore = _context.Wishlists.Count();

            await controller.DeleteWishlist(wishlistIdToDelete);
            
            var countAfter = _context.Wishlists.Count();
            
            Assert.False(_context.Wishlists.Any(x => x.WishlistId == wishlistIdToDelete));
            Assert.Equal(countBefore, countAfter + 1);
        }
        
        [Fact]
        public async void DeleteWishlistNotPossibleIfNotOwner()
        {
            _context = TestUtils.GetContext();
            var controller = new WishlistController(_context);
            TestUtils.MockAuth(controller, testUserId);
            
            // Wishlist user with id 1 isn't the owner of
            const int wishlistIdToDelete = 2;

            var countBefore = _context.Wishlists.Count();

            var res = await controller.DeleteWishlist(wishlistIdToDelete);
            var statusResult = res as UnauthorizedResult;
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status401Unauthorized);
            
            var countAfter = _context.Wishlists.Count();

            Assert.True(_context.Wishlists.Any(x => x.WishlistId == wishlistIdToDelete));
            Assert.Equal(countBefore, countAfter);
        }

        [Fact]
        public void GetWishlist()
        {
            _context = TestUtils.GetContext();
            var controller = new WishlistController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var wishlists = controller.GetWishlists();

            var wishlistDtos = wishlists as WishlistDto[] ?? wishlists.ToArray();
            var isUsersWishlists = wishlistDtos.All(x => x.Owner.Id == testUserId);
            
            Assert.True(isUsersWishlists);
            Assert.True(wishlistDtos.Any());
        }

        [Fact]
        public async void CreateWishlist()
        {
            _context = TestUtils.GetContext();
            var controller = new WishlistController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var wishlistToCreate = new CreateWishlistDto() {Deadline = new DateTime(2021, 12, 24), Title = "testWish"};

            var countBefore = _context.Wishlists.Count();
            
            var res = await controller.CreateWishlist(wishlistToCreate);
            var wishlistId = res.Value.Id;
            
            var wishlistHasBeenAdded = _context.Wishlists.Any(w => w.WishlistId == wishlistId);

            Assert.Equal(_context.Wishlists.Count(), countBefore + 1);
            Assert.True(wishlistHasBeenAdded);
        }
        
    }
}
