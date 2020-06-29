using System;
using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Product : EntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Stock { get; set; }

        public DateTime RegistrationDate { get; set; }

        public int CategoryId { get; set; }

        public virtual CategoryProduct Category { get; set; }

        public virtual IList<ProductIngredient> ProductsIngredients { get; set; }

        //public virtual IList<ProductOrder> ProductsOrder { get; set; }
    }
}