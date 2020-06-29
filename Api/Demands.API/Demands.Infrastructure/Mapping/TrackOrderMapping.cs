using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class TrackOrderMapping : IEntityTypeConfiguration<TrackOrder>
    {
        public void Configure(EntityTypeBuilder<TrackOrder> builder)
        {
            //key
            builder.HasKey(t => t.Id);

            builder.HasOne(t => t.Order)
                .WithMany(t => t.TrackersOrder)
                .HasForeignKey(t => t.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne(t => t.User)
            //    .WithMany(t => t.TrackersOrder)
            //    .HasForeignKey(t => t.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
