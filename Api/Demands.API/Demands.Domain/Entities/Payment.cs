using System;
using System.ComponentModel;

namespace Demands.Domain.Entities
{
    public class Payment : EntityBase
    {
        public decimal Value { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public int BillId { get; set; }
        public Bill Bill { get; set; }
        public DateTime RegistrationDate { get; set; }
    }

    public enum PaymentMethod
    {
        [Description("Cash")]
        Cash = 1,
        [Description("Debit Card")]
        DebitCard = 2,
        [Description("Credit Card")]
        CreditCard = 3,
    }
}
