using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Order : EntityBase
    {
        public string Observation { get; set; }

        public virtual int TableId { get; set; }

        public virtual Table Table { get; set; }

        public virtual IList<ProductOrder> ProductsOrder { get; set; }

        public virtual IList<TrackOrder> TrackersOrder { get; set; }
    }
}
