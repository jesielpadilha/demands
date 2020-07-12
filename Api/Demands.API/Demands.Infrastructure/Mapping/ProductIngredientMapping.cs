using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class ProductIngredientMapping : IEntityTypeConfiguration<ProductIngredient>
    {
        public void Configure(EntityTypeBuilder<ProductIngredient> builder)
        {
            builder.HasOne(p => p.Product)
                .WithMany(p => p.ProductsIngredients)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Ingredient)
                .WithMany(p => p.ProductsIngredients)
                .HasForeignKey(p => p.IngredientId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
