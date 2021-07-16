using System;
using backend.models;

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
        
        
    }
}