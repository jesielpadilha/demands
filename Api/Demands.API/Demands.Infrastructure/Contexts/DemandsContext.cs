using System;
using System.Linq;
using Demands.Domain.Entities;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductIngredient>().HasKey(p => new { p.ProductId, p.IngredientId });
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
