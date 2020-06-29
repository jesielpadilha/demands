using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Demands.Infrastructure.Repositories
{
    public class ProductRepository : RepositoryBase<Product, DemandsContext>, IProductRepository
    {
        private readonly  DemandsContext _context;
        public ProductRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Return a product with its all attributes (including Ingredients and Category)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Product GetProduct(int id)
        {
            var product = _context.Product
                .Include(p => p.Category)
                .Include(p => p.ProductsIngredients)
                .FirstOrDefault(p => p.Id == id);
           
            return product;
        }
    }
}
