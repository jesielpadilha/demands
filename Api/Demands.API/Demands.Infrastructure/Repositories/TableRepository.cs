using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class TableRepository : RepositoryBase<Table, DemandsContext>, ITableRepository
    {
        private readonly DemandsContext _context;
        public TableRepository(DemandsContext context) : base(context)
        {
            _context = context;
        }

        public Table ChangeBusyStatus(int id)
        {
            var table = GetById(id);
            if (table == null) return null;

            table.IsBusy = !table.IsBusy;
            _context.SaveChanges();
            
            return table;
        }
    }
}
