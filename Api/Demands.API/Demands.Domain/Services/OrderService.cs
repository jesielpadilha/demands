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

        public IList<Order> OrdersByTableId(int tableId, bool isBillClosed = false)
        {
            return _repository.OrdersByTableId(tableId, isBillClosed);
        }

        public bool CreateOrder(int userId, Order order)
        {
            return _repository.CreateOrder(userId, order);
        }

        public IList<Order> GetOpenedOrders()
        {
            return _repository.GetOpenedOrders();
        }
    }
}
