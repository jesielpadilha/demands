using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class ProductOrderMapping : IEntityTypeConfiguration<ProductOrder>
    {
        public void Configure(EntityTypeBuilder<ProductOrder> builder)
        {
            //keys
            builder.HasKey(p => p.Id);
            //builder.HasOne(p => p.Product)
            //    .WithMany(p => p.ProductsOrder)
            //    .HasForeignKey(p => p.ProductId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
