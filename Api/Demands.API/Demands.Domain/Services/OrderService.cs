using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class OrderService : ServiceBase<Order>, IOrderService
    {
        private readonly IOrderRepository _repository;

        public OrderService(IOrderRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
