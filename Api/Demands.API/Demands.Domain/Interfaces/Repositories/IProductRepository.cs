using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Repositories
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        /// <summary>
        /// Return a product with its all attributes (including Ingredients and Category)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Product GetProduct(int id);
    }
}
