using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demands.Domain.Entities
{
    public class Ingredient : EntityBase
    {
        public string Name { get; set; }

        //public virtual IList<ProductIngredient> ProductsIngredients { get; set; }
    }
}
