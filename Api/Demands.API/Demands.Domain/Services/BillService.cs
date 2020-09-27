using System;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class BillService : ServiceBase<Bill>, IBillService
    {
        private readonly IBillRepository _repository;
        public BillService(IBillRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public Bill Save(Order order)
        {
            try
            {
                var totalBill = order.ProductsOrder.Sum(p => p.Amount * p.Product.Price);
                if (totalBill == null || totalBill == 0)
                    return null;

                return _repository.Save(new Bill
                {
                    TableId = order.TableId,
                    Total = totalBill
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("Error to save a Bill");
            }
        }

        public bool CloseBill(Bill bill, PaymentMethod paymentMethod)
        {
            try
            {
                bill.ClosedDate = DateTime.Now;

                var payment = new Payment
                {
                    BillId = bill.Id,
                    PaymentMethod = paymentMethod,
                    Value = bill.Total
                };
                return _repository.CloseBill(bill, payment);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("Error to close a Bill");
            }
        }
    }
}