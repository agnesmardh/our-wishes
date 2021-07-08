using System;
namespace backend.models
{
    public class WishDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Bought { get; set; }

        public override string ToString()
        {
            return $"{nameof(Id)}: {Id}, {nameof(Title)}: {Title}, {nameof(Bought)}: {Bought}";
        }
    }
}
