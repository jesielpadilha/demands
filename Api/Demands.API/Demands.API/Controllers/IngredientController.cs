using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase<Ingredient, IIngredientService>
    {
        public IngredientController(IIngredientService service) : base(service)
        {

        }
    }
}
