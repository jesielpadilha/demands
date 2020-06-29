namespace Demands.Domain.Entities
{
    public class ProductOrderIngredient : EntityBase
    {
        public int ProductOrderId { get; set; }

        public int IngredientId { get; set; }

        public int AmountIngredient { get; set; }

        public virtual ProductOrder ProductOrder { get; set; }

        public virtual Ingredient Ingredient { get; set; }
    }
}