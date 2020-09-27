using System;
using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Demands.Infrastructure.Repositories
{
    public class OrderRepository : RepositoryBase<Order, DemandsContext>, IOrderRepository
    {
        private readonly DemandsContext _context;
        public OrderRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        public Order GetById(int id)
        {
            return _context.Order
                .Include(o => o.ProductsOrder).ThenInclude(o => o.Product)
                .Include(o => o.TrackersOrder)
                .SingleOrDefault(o => o.Id == id);
        }

        public IList<Order> GetOpenedOrders()
        {
            var openedStatusList = new[] { StatusOrder.Created, StatusOrder.BeingPrepared, StatusOrder.Ready };
            return _context.Order
                .Include(o => o.ProductsOrder).ThenInclude(o => o.Product)
                .Include(o => o.TrackersOrder)
                .Include(o => o.Table)
                .Where(o => openedStatusList.Contains(o.TrackersOrder.OrderByDescending(t => t.RegistrationDate).FirstOrDefault().Status))
                .OrderBy(o => o.TrackersOrder.FirstOrDefault().RegistrationDate).ToList();
        }

        public IList<Order> OrdersByTableId(int tableId, bool isBillClosed = false)
        {
            var query = _context.Order
                .Include(o => o.ProductsOrder).ThenInclude(o => o.Product)
                .Include(o => o.TrackersOrder)
                .Include(o => o.Bill);

            return isBillClosed
                ? query.Where(o => o.TableId == tableId && o.Bill.ClosedDate != null).ToList()
                : query.Where(o => o.TableId == tableId && o.Bill.ClosedDate == null).ToList();
        }

        public bool CreateOrder(int userId, Order order)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var productsOrder = _context.Product
                    .Where(p => order.ProductsOrder.Select(o => o.ProductId).Contains(p.Id)).ToList();
                var totalBill = (from po in order.ProductsOrder
                    from p in productsOrder
                    where po.ProductId == p.Id
                    select po.Amount * p.Price).Sum();
                if (totalBill == 0)
                    return false;

                var bill = _context.Bill.SingleOrDefault(b => b.ClosedDate == null && b.TableId == order.TableId);
                if (bill == null)
                {
                    bill = new Bill
                    {
                        TableId = order.TableId,
                        Total = totalBill
                    };
                    _context.Bill.Add(bill);
                }
                else
                {
                    bill.Total += totalBill;
                    _context.Bill.Update(bill);
                }
                _context.SaveChanges();

                order.BillId = bill.Id;
                _context.Order.Add(order);
                _context.SaveChanges();

                if (order.Id <= 0 && userId <= 0) return false;

                _context.TrackOrder.Add(new TrackOrder
                {
                    OrderId = order.Id,
                    UserId = userId,
                    Status = StatusOrder.Created,
                });
                _context.SaveChanges();

                transaction.Commit();
                return true;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                Console.WriteLine(e);
                return false;
            }
        }
    }
}