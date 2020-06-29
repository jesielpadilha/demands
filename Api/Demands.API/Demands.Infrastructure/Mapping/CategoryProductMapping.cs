using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class CategoryProductMapping : IEntityTypeConfiguration<CategoryProduct>
    {
        public void Configure(EntityTypeBuilder<CategoryProduct> builder)
        {
            builder.Property(c => c.Name).IsRequired();
            //keys
            builder.HasKey(c => c.Id);
        }
    }
}
