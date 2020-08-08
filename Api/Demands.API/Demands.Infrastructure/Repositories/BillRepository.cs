using System.Linq;
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
    }
}