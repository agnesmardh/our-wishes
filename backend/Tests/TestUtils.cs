using System;
using System.Security.Claims;
using backend.Controllers;
using backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Tests
{
    public static class TestUtils
    {
        public static WishlistContext GetContext()
        {
            var options = new DbContextOptionsBuilder<WishlistContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var context = new WishlistContext(options);
            WishlistContext.AddTestData(context);
            context.SaveChanges();
            
            return context;
        }

        private static ClaimsPrincipal MockUser(string testUserId)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, testUserId),
                new Claim(ClaimTypes.Name, "test@somecompany.com")
            },"TestAuthentication"));

            return user;
        }
        
        public static void MockAuth(BaseController controller, string testUserId)
        {
            var user = MockUser(testUserId);
            controller.ControllerContext = new ControllerContext {HttpContext = new DefaultHttpContext {User = user}};
        }
    }
}