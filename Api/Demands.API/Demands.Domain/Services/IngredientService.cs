using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class IngredientService : ServiceBase<Ingredient>, IIngredientService
    {
        private readonly IIngredientRepository _repository;

        public IngredientService(IIngredientRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
