using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class TableRepository : RepositoryBase<Table, DemandsContext>, ITableRepository
    {
        public TableRepository(DemandsContext context) : base(context)
        {

        }
    }
}
