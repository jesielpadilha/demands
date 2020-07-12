using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class ProductOrder : EntityBase
    {
        public int Amount { get; set; }

        public string Observation { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }


        public int OrderId { get; set; }
        public Order Order { get; set; }

        public IList<ProductOrderIngredient> ProductOrderIngredients { get; set; }
    }
}
