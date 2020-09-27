using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class PaymentMapping : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.Property(c => c.Value).HasColumnType("decimal(18,2)");
            builder.Property(c => c.RegistrationDate).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()");

            //keys
            builder.HasKey(c => c.Id);
        }
    }
}
