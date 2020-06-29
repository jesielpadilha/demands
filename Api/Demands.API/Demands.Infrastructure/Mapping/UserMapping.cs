using Demands.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Demands.Infrastructure.Mapping
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Name).IsRequired();
            builder.Property(u => u.Username).IsRequired();
            builder.Property(u => u.Password).IsRequired();
            //keys
            builder.HasKey(u => u.Id);
        }
    }
}
