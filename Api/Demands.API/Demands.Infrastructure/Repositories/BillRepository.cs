using System;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class BillRepository : RepositoryBase<Bill, DemandsContext>, IBillRepository
    {
        private readonly DemandsContext _context;
        public BillRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        public Bill Save(Bill bill)
        {
            _context.Bill.Add(bill);
            _context.SaveChanges();
            return bill;
        }

        public bool CloseBill(Bill bill, Payment payment)
        {

            var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.Bill.Update(bill);
                _context.SaveChanges();

                _context.Payment.Add(payment);
                _context.SaveChanges();

                transaction.Commit();
                return true;
            }
            catch (Exception e)
            {
                transaction.Rollback();

                Console.WriteLine(e);
                throw new Exception("Fail to close the bill");
            }
        }
    }
}