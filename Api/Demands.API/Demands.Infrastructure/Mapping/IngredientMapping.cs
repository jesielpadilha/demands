using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class IngredientMapping : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure(EntityTypeBuilder<Ingredient> builder)
        {
            builder.Property(i => i.Name).IsRequired();
            //keys
            builder.HasKey(i => i.Id);
        }
    }
}
