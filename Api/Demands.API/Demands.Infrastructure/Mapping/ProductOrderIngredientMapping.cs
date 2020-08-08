using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class ProductOrderIngredientMapping : IEntityTypeConfiguration<ProductOrderIngredient>
    {
        public void Configure(EntityTypeBuilder<ProductOrderIngredient> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.ProductOrder)
                .WithMany(p => p.ProductOrderIngredients)
                .HasForeignKey(p => p.ProductOrderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
