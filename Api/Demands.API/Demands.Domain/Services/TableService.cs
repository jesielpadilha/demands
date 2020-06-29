using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class TableService : ServiceBase<Table>, ITableService
    {
        private readonly ITableRepository _repository;

        public TableService(ITableRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
