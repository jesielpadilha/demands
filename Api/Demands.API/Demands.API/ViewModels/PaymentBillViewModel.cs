using Demands.Domain.Entities;

namespace Demands.API.ViewModels
{
    public class PaymentBillViewModel
    {
        public int BillId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}
