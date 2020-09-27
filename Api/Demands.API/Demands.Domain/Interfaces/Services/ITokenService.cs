using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}