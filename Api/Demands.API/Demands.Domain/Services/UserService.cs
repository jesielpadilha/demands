using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class UserService : ServiceBase<User>, IUserService
    {
        private readonly IUserRepository _repository;
        private readonly ISecurityService _securityService;

        public UserService(IUserRepository repository, ISecurityService securityService) : base(repository)
        {
            _repository = repository;
            _securityService = securityService;
        }

        public void AddUser(User user)
        {
            user.Password = _securityService.GenerateHashSha256(user.Password);
            _repository.Add(user);
        }

        public void Update(User user)
        {
            _repository.Update(user);
        }

        public void UpdatePassword(User user, string newPassword)
        {
            _repository.UpdatePassword(user, _securityService.GenerateHashSha256(newPassword));
        }

        public User Login(string username, string password)
        {
            password = _securityService.GenerateHashSha256(password);
            return _repository.Login(username, password);
        }
    }
}
