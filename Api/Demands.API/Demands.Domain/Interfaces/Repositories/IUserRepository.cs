using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        void Update(User user);

        void UpdatePassword(User user, string newPassword);

        User Login(string username, string password);
    }
}
