using System.Linq;
using backend.models;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class WishlistControllerTest
    {

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

        [Fact]
        public void TestContext()
        {
            var context = GetContext();
            Assert.Equal(2, context.Wishlists.Count());
        }
    }
}
