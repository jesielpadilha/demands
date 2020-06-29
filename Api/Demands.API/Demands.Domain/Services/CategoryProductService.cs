using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class CategoryProductService : ServiceBase<CategoryProduct>, ICategoryProductService
    {
        private readonly ICategoryProductRepository _repository;

        public CategoryProductService(ICategoryProductRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
