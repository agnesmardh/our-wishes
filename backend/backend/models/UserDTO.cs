namespace backend.models
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }

        public static UserDto ToDto(User user)
        {
            if (user == null)
            {
                return null;
            }
            return new UserDto
            {
                Id = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl
            };
        }
    }
}
