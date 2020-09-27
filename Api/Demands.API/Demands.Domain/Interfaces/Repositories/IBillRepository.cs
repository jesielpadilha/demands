using Demands.Domain.Entities;

namespace Demands.Domain.Interfaces.Repositories
{
    public interface IBillRepository : IRepositoryBase<Bill>
    {
        Bill Save(Bill bill);

        bool CloseBill(Bill bill, Payment payment);
    }
}