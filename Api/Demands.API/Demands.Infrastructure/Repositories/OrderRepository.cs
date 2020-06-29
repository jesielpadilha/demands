using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class OrderRepository : RepositoryBase<Order, DemandsContext>, IOrderRepository
    {
        public OrderRepository(DemandsContext context) : base(context)
        {

        }
    }
}
