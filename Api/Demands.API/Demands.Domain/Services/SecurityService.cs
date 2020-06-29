using System.Text;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class SecurityService : ISecurityService
    {
        public string GenerateHashSha256(string data)
        {
            var crypt = new System.Security.Cryptography.SHA256Managed();
            var hash = new StringBuilder();
            var crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(data), 0, Encoding.UTF8.GetByteCount(data));
            foreach (var theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }
    }
}
