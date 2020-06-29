using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class ProductOrder : EntityBase
    {
        public int Amount { get; set; }

        public string Observation { get; set; }

        public int ProductId { get; set; }

        public int OrderId { get; set; }

        public virtual Product Product { get; set; }

        public virtual Order Order { get; set; }

        public virtual IList<ProductOrderIngredient> ProductOrderIngredients { get; set; }
    }
}
