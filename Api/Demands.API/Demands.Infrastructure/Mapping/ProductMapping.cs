using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Name).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            //keys
            builder.HasKey(p => p.Id);
            //builder.HasOne(p => p.Category)
            //    .WithMany(p => p.Products)
            //    .HasForeignKey(p => p.CategoryId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
