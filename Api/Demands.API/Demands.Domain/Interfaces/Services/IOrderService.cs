using System.Collections.Generic;
using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Services
{
    public interface IOrderService : IServiceBase<Order>
    {
        IList<Order> OrdersByTableId(int tableId);

        bool CreateOrder(int userId, Order order);
    }
}