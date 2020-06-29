using System.Collections.Generic;

namespace Demands.Domain.Entities
{
    public class Table : EntityBase
    {
        public int Number { get; set; }

        public bool IsBusy { get; set; }

        public string Description { get; set; }

        //public virtual IList<Order> Orders { get; set; }
    }
}
