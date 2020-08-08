using System;
using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class BillMapping : IEntityTypeConfiguration<Bill>
    {
        public void Configure(EntityTypeBuilder<Bill> builder)
        {
            builder.Property(c => c.Total).HasColumnType("decimal(18,2)");
            builder.Property(c => c.RegistrationDate).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()");
            builder.Property(c => c.ClosedDate).HasColumnType("datetime2");
            //keys
            builder.HasKey(c => c.Id);
        }
    }
}