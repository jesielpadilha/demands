using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Order : EntityBase
    {
        public string Observation { get; set; }

        public int TableId { get; set; }
        public virtual Table Table { get; set; }

        public int BillId { get; set; }
        public virtual Bill Bill { get; set; }

        public IList<ProductOrder> ProductsOrder { get; set; }

        public IList<TrackOrder> TrackersOrder { get; set; }
    }
}
