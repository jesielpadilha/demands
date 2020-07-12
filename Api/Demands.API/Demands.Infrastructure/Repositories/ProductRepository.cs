using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Demands.Infrastructure.Repositories
{
    public class ProductRepository : RepositoryBase<Product, DemandsContext>, IProductRepository
    {
        private readonly DemandsContext _context;
        public ProductRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        public IList<Product> GetAll()
        {
            return _context.Product.Include(p => p.Category).ToList();
        }

        public Product GetById(int id)
        {
            var product = _context.Product
                .Include(p => p.Category)
                .Include(p => p.ProductsIngredients)
                .ThenInclude(p => p.Ingredient)
                .SingleOrDefault(p => p.Id == id);

            return product;
        }

        public void UpdateAll(Product product)
        {
            var productUpdate = GetById(product.Id);
            if (productUpdate == null) return;

            productUpdate.Name = product.Name;
            productUpdate.Description = product.Description;
            productUpdate.Price = product.Price;
            productUpdate.Stock = product.Stock;
            productUpdate.CategoryId = product.CategoryId;
            _context.SaveChanges();

            _context.RemoveRange(productUpdate.ProductsIngredients);
            _context.SaveChanges();

            _context.AddRange(product.ProductsIngredients);
            _context.SaveChanges();
        }
    }
}
