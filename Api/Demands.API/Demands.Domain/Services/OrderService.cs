using System.Collections.Generic;
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

        public IList<Order> OrdersByTableId(int tableId)
        {
            return _repository.OrdersByTableId(tableId);
        }

        public bool CreateOrder(int userId, Order order)
        {
            return _repository.CreateOrder(userId, order);
        }
    }
}
