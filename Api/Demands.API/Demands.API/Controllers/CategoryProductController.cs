using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/category-product")]
    [ApiController]
    public class CategoryProductController : ControllerBase<CategoryProduct, ICategoryProductService>
    {
        public CategoryProductController(ICategoryProductService service) : base(service)
        {

        }
    }
}
