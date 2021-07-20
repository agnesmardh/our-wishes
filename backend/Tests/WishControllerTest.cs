using System;
using System.Linq;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class WishControllerTest : IDisposable
    {
        private static WishlistContext _context;
        private static string testUserId = "1";


        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async void CreateWish()
        {
            
            _context = TestUtils.GetContext();
            var controller = new WishController(_context);
            TestUtils.MockAuth(controller, testUserId);
            
            var wishToAdd = new WishDto.CreateWishDto(title: "Test", link: "", wishlistId: 1);

            var countBefore = _context.Wishes.Count();

            var res = await controller.CreateWish(wishToAdd);
            var wishId = res.Value.Id;

            var countAfter = _context.Wishes.Count();
            var wishHasBeenAddedToWishlist = _context.Wishlists
                .Include(wishlist => wishlist.Wishes)
                .First(x => x.WishlistId == 1)
                .Wishes
                .Any(w => w.WishId == wishId);
            
            Assert.Equal(countBefore + 1, countAfter);
            Assert.True(wishHasBeenAddedToWishlist);

        }
        
        [Fact]
        public async void CreateWishNotPossibleIfNotOwner()
        {
            _context = TestUtils.GetContext();
            var controller = new WishController(_context);
            TestUtils.MockAuth(controller, "2");

            var wishToAdd = new WishDto.CreateWishDto(title: "test", link: "", wishlistId: 1);

            var countBefore = _context.Wishes.Count();

            var res = await controller.CreateWish(wishToAdd);
            var statusResult = res.Result as UnauthorizedResult;
            
            var countAfter = _context.Wishes.Count();
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status401Unauthorized);
            Assert.Equal(countBefore, countAfter);
        }
        
        [Fact]
        public async void CreateWishNotPossibleIfWishlistDoesNotExist()
        {
            _context = TestUtils.GetContext();
            var controller = new WishController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var wishToAdd = new WishDto.CreateWishDto(title: "Test", link: "", wishlistId: 20);

            var countBefore = _context.Wishes.Count();

            var res = await controller.CreateWish(wishToAdd);
            var statusResult = res.Result as NotFoundResult;
            
            var countAfter = _context.Wishes.Count();
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status404NotFound);
            Assert.Equal(countBefore, countAfter);
        }

        [Fact]
        public async void DeleteWish()
        {
            _context = TestUtils.GetContext();
            var controller = new WishController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var idToRemove = 1;
            
            var countBefore = _context.Wishes.Count();

            var res = await controller.DeleteWish(idToRemove);

            var countAfter = _context.Wishes.Count();
            var wishIsInWishlist = _context.Wishlists
                .Include(wishlist => wishlist.Wishes)
                .First(x => x.WishlistId == 1)
                .Wishes
                .Any(w => w.WishId == idToRemove);
            
            Assert.Equal(countBefore, countAfter + 1);
            Assert.False(wishIsInWishlist);

        }
        
        [Fact]
        public async void DeleteWishNotPossibleIfNotOwner()
        {
            _context = TestUtils.GetContext();
            var controller = new WishController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var idToRemove = 3;
            
            var countBefore = _context.Wishes.Count();

            var res = await controller.DeleteWish(idToRemove);
            var statusResult = res as UnauthorizedResult;

            var countAfter = _context.Wishes.Count();
            var wishIsInWishlist = _context.Wishlists
                .Include(wishlist => wishlist.Wishes)
                .First(x => x.WishlistId == 2)
                .Wishes
                .Any(w => w.WishId == idToRemove);
            
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status401Unauthorized);
            Assert.Equal(countBefore, countAfter);
            Assert.True(wishIsInWishlist);

        }
    }
}