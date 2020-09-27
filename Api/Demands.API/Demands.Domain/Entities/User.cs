using System.ComponentModel.DataAnnotations.Schema;

namespace Demands.Domain.Entities
{
    public class User : EntityBase
    {
        public string Name { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool IsActive { get; set; }

        public UserType Type { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }

    public enum UserType { Admin = 1, Manager = 2, Waiter = 3}
}
