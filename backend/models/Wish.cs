using System;
namespace backend.models

{
    public class Wish
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Title { get; set; }
        public bool Bought { get; set; }
    }
}
