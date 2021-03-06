﻿using System.Collections.Generic;
using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Repositories
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        IList<Order> OrdersByTableId(int tableId, bool isBillClosed = false);

        bool CreateOrder(int userId, Order order);

        IList<Order> GetOpenedOrders();
    }
}