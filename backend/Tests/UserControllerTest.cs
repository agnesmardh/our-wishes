using System;
using System.Linq;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Tests
{
    public class UserControllerTest : IDisposable
    {
        
        private static WishlistContext _context;
        private static string testUserId = "1";
        
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
        
        [Fact]
        public async void CreateUser()
        {
            var id = "71";
            var email = "test@company.com";
            
            _context = TestUtils.GetContext();
            var controller = new UserController(_context);
            TestUtils.MockAuth(controller, testUserId, email);

            var userToAdd = new UserDto.CreateUserDto()
            {
                Id = id,
                Email = email
            };

            var countBefore = _context.Users.Count();

            var res = await controller.CreateUser(userToAdd);
            var userId = res.Value.Id;

            var countAfter = _context.Users.Count();
            var userHasBeenAdded = _context.Users.Any(u => u.UserId == id);
            
            Assert.Equal(countBefore + 1, countAfter);
            Assert.Equal(id, userId);
            Assert.True(userHasBeenAdded);
        }

        [Fact]
        public void GetUser()
        {
            _context = TestUtils.GetContext();
            var controller = new UserController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var result = controller.GetUser(testUserId);
            
            Assert.Equal(testUserId, result.Result.Value.Id);
        }
        
        [Fact]
        public void NotPossibleGetOtherUSer()
        {
            _context = TestUtils.GetContext();
            var controller = new UserController(_context);
            TestUtils.MockAuth(controller, testUserId);

            var idToGet = "2";
            var result = controller.GetUser(idToGet);
            
            var statusResult = result.Result.Result as UnauthorizedResult;
            
            Assert.NotNull(statusResult);
            Assert.Equal(statusResult.StatusCode, StatusCodes.Status401Unauthorized);

        }
    }
}