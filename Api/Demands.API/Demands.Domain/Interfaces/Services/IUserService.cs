using System.Data;
using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Services
{
    public interface IUserService : IServiceBase<User>
    {
        void AddUser(User user);
        void Update(User user);
        void UpdatePassword(User user, string newPassword);
        User Login(string username, string password);
    }
}
