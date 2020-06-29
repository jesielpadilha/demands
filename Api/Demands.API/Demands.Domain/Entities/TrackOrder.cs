using System;
using System.ComponentModel;

namespace Demands.Domain.Entities
{
    public class TrackOrder : EntityBase
    {
        public DateTime DateRegistration { get; set; }

        public StatusOrder Status { get; set; }

        public int OrderId { get; set; }

        public int UserId { get; set; }
        
        public virtual Order Order { get; set; }

        public virtual User User { get; set; }   
    }

    public enum StatusOrder
    {
        [Description("Created")]
        Created = 1,
        [Description("Being Prepared")]
        BeingPrepared = 2,
        [Description("Ready")]
        Ready = 3,
        [Description("Delivered")]
        Delivered = 4,
    }
}
