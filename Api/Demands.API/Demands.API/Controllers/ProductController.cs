using System.Linq;
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
            var product = _service.GetById(id);
            if (product == null) return NotFound();

            product.ProductsIngredients = product.ProductsIngredients.Select(p => new ProductIngredient
            {
                ProductId = p.ProductId,
                IngredientId = p.IngredientId,
                Ingredient = new Ingredient
                {
                    Id = p.Ingredient.Id,
                    Name = p.Ingredient.Name
                }
            }).ToList();

            return Ok(product);
        }

        [HttpGet("get-all-products")]
        public IActionResult GetAllProducts()
        {
            var products = _service.GetAll();

            products = products.Select(p => new Product
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                CategoryId = p.CategoryId,
                Category = p.Category,
                ProductsIngredients = p.ProductsIngredients.Any()
                ? p.ProductsIngredients.Select(pi => new ProductIngredient
                {
                    ProductId = pi.ProductId,
                    IngredientId = pi.IngredientId,
                    Ingredient = new Ingredient
                    {
                        Id = pi.IngredientId,
                        Name = pi.Ingredient.Name
                    }
                }).ToList()
                : null
            }).ToList();

            return Ok(products);
        }
    }
}
