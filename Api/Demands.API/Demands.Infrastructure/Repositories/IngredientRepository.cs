using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class IngredientRepository : RepositoryBase<Ingredient, DemandsContext>, IIngredientRepository
    {
        public IngredientRepository(DemandsContext context) : base(context)
        {

        }
    }
}
