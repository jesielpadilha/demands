using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore.Design;

namespace Demands.Infrastructure.Repositories
{
    public class UserRepository : RepositoryBase<User, DemandsContext>, IUserRepository
    {
        private readonly DemandsContext _context;

        public UserRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        public void Update(User user)
        {
            var userUpdate = GetById(user.Id);
            if (userUpdate == null) return;

            if (!string.IsNullOrEmpty(user.Name)) userUpdate.Name = user.Name;
            if (!string.IsNullOrEmpty(user.Username)) userUpdate.Username = user.Username;
            if (user.Type > 0) userUpdate.Type = user.Type;
            if (userUpdate.IsActive != user.IsActive) userUpdate.IsActive = user.IsActive;
            UpdateAll(userUpdate);
        }

        public void UpdatePassword(User user, string newPassword)
        {
            var userUpdate = GetById(user.Id);
            if (userUpdate == null) return;

            userUpdate.Password = newPassword;
            UpdateAll(userUpdate);
        }

        public User Login(string username, string password)
        {
            var user = _context.User.SingleOrDefault(u => u.Username.Equals(username) && u.Password.Equals(password));
            if (user == null) return null;
           
            return new User
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Type = user.Type,
                IsActive = user.IsActive
            };
        }
    }
}
