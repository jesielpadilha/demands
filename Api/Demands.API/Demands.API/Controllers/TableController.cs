using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase<Table, ITableService>
    {
        private readonly ITableService _service;
        public TableController(ITableService service) : base(service)
        {
            _service = service;
        }

        [HttpGet("change-busy-status/{id}")]
        [Authorize]
        public IActionResult ChangeBusyStatus(int id)
        {
            var table = _service.ChangeBusyStatus(id);
            if (table == null) return NotFound(false);

            return Ok(table);
        }
    }
}
