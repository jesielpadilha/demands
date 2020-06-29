using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Services
{
    public interface IProductService : IServiceBase<Product>
    {
        Product GetProduct(int id);
    }
}
