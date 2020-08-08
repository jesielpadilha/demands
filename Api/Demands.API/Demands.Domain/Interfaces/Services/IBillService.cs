using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Services
{
    public interface IBillService : IServiceBase<Bill>
    {
        Bill Save(Order order);
    }
}
