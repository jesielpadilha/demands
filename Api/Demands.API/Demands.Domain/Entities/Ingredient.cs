using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Ingredient : EntityBase
    {
        public string Name { get; set; }

        public IList<ProductIngredient> ProductsIngredients { get; set; }
    }
}
