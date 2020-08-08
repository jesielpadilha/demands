using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;
using Demands.Domain.Services;
using Demands.Infrastructure.Contexts;
using Demands.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Demands.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDataAccessServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DemandsContext>(options =>
                options.UseSqlServer(connectionString));
        }

        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITableRepository, TableRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();
            services.AddScoped<ICategoryProductRepository, CategoryProductRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ITrackOrderRepository, TrackOrderRepository>();
            services.AddScoped<IBillRepository, BillRepository>();
        }

        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<ISecurityService, SecurityService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITableService, TableService>();
            services.AddScoped<IIngredientService, IngredientService>();
            services.AddScoped<ICategoryProductService, CategoryProductService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ITrackOrderService, TrackOrderService>();
            services.AddScoped<IBillService, BillService>();
        }
    }
}
