using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Repositories
{
    public interface ITableRepository : IRepositoryBase<Table>
    {
        Table ChangeBusyStatus(int id);
    }
}
