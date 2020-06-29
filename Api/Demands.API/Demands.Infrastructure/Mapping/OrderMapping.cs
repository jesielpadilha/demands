using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class OrderMapping : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            //keys
            builder.HasKey(o => o.Id);
            //builder.HasOne(o => o.Table)
            //    .WithMany(o => o.Orders)
            //    .HasForeignKey(o => o.TableId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
