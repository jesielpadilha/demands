using System;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Infrastructure.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Demands.Infrastructure.Contexts
{
    public class DemandsContext : DbContext
    {
        public DemandsContext() : base() { }

        public DemandsContext(DbContextOptions<DemandsContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<CategoryProduct> CategoryProduct { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<ProductOrder> ProductOrder { get; set; }
        public DbSet<TrackOrder> TrackOrder { get; set; }
        public DbSet<Table> Table { get; set; }
        public DbSet<ProductIngredient> ProductIngredient { get; set; }
        public DbSet<ProductOrderIngredient> ProductOrderIngredient { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public DbSet<Payment> Payment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductIngredientMapping());
            modelBuilder.ApplyConfiguration(new ProductMapping());
            modelBuilder.ApplyConfiguration(new CategoryProductMapping());
            modelBuilder.ApplyConfiguration(new IngredientMapping());
            modelBuilder.ApplyConfiguration(new OrderMapping());
            modelBuilder.ApplyConfiguration(new TableMapping());
            modelBuilder.ApplyConfiguration(new TrackOrderMapping());
            modelBuilder.ApplyConfiguration(new UserMapping());
            modelBuilder.ApplyConfiguration(new ProductOrderMapping());
            modelBuilder.ApplyConfiguration(new ProductOrderIngredientMapping());
            modelBuilder.ApplyConfiguration(new BillMapping());
            modelBuilder.ApplyConfiguration(new PaymentMapping());
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(e => e.Entity.GetType()
                .GetProperty("RegistrationDate") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("RegistrationDate").CurrentValue = DateTime.Now;
                }
                if (entry.State == EntityState.Modified)
                {
                    entry.Property("RegistrationDate").IsModified = false;
                }
            }

            return base.SaveChanges();
        }
    }
}
