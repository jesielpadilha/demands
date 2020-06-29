using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class CategoryProductRepository : RepositoryBase<CategoryProduct, DemandsContext>, ICategoryProductRepository
    {
        public CategoryProductRepository(DemandsContext context) : base(context)
        {
            
        }
    }
}
