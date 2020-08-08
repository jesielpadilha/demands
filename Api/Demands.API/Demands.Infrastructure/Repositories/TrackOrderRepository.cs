using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;

namespace Demands.Infrastructure.Repositories
{
    public class TrackOrderRepository : RepositoryBase<TrackOrder, DemandsContext>, ITrackOrderRepository
    {
        public TrackOrderRepository(DemandsContext context) : base(context)
        {

        }
    }
}