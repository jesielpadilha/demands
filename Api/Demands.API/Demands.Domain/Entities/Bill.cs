using System;
using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Bill : EntityBase
    {
        public decimal Total { get; set; }
        public int TableId { get; set; }
        public Table Table { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public IList<Order> Orders { get; set; }
    }
}