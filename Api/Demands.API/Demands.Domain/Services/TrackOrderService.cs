using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class TrackOrderService : ServiceBase<TrackOrder>, ITrackOrderService
    {
        private readonly ITrackOrderRepository _repository;

        public TrackOrderService(ITrackOrderRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
