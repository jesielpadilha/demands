using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase<Table, ITableService>
    {
        public TableController(ITableService service) : base(service)
        {
            
        }
    }
}
