namespace Demands.Domain.Interfaces.Services
{
    public interface ISecurityService
    {
        string GenerateHashSha256(string data);
    }
}
