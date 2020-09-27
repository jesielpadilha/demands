using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class UserService : ServiceBase<User>, IUserService
    {
        private readonly IUserRepository _repository;
        private readonly ISecurityService _securityService;
        private readonly ITokenService _tokenService;


        public UserService(IUserRepository repository, ISecurityService securityService, ITokenService tokenService) : base(repository)
        {
            _repository = repository;
            _securityService = securityService;
            _tokenService = tokenService;
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
            var user = _repository.Login(username, password);

            if (user == null) return null;

            user.Token = _tokenService.GenerateToken(user);
            return user;
        }
    }
}
