 using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class TableMapping : IEntityTypeConfiguration<Table>
    {
        public void Configure(EntityTypeBuilder<Table> builder)
        {
            builder.HasKey(t => t.Id);
        }
    }
}
