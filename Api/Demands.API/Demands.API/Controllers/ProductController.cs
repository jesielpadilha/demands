using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase<Product, IProductService>
    {
        private readonly IProductService _service;

        public ProductController(IProductService service) : base(service)
        {
            _service = service;
        }

        [HttpGet("get-product/{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _service.GetProduct(id);
            if (product == null) return NotFound();

            return Ok(product);
        }
    }
}
