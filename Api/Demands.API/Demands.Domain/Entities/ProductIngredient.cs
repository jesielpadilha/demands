namespace Demands.Domain.Entities
{
    public class ProductIngredient
    {
        public int ProductId { get; set; }
        public int IngredientId { get; set; }
        public virtual Product Product { get; set; }
        public virtual Ingredient Ingredient { get; set; }
    }
}
