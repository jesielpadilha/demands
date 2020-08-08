using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;
        private readonly ITrackOrderService _trackOrderService;
        private readonly IBillService _billService;
        public OrderController(IOrderService service, ITrackOrderService trackOrerService, IBillService billService)
        {
            _service = service;
            _trackOrderService = trackOrerService;
            _billService = billService;
        }

        [HttpGet]
        public IList<Order> Get()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = _service.GetById(id);
            if (order == null) return NotFound();

            return Ok(order);
        }

        [HttpPost("{userId}")]
        public IActionResult Post(int userId, [FromBody] Order order)
        {
            if (userId == 0 || order.ProductsOrder.Count == 0)
                return Ok(false);

            _service.CreateOrder(userId, order);

            return Ok(true);
        }

        [HttpGet("orders-by-table/{id}")]
        public IList<Order> OrdersByTableId(int id)
        {
            var orders = _service.OrdersByTableId(id);
            return orders.Select(o => new Order
            {
                Id = o.Id,
                Observation = o.Observation,
                TableId = o.TableId,
                ProductsOrder = o.ProductsOrder.Select(p => new ProductOrder
                {
                    Id = p.Id,
                    Observation = p.Observation,
                    Amount = p.Amount,
                    Product = new Product
                    {
                        Id = p.Product.Id,
                        Name = p.Product.Name,
                        Price = p.Product.Price
                    }
                }).ToList(),
                TrackersOrder = o.TrackersOrder.Select(t => new TrackOrder
                {
                    Id = t.Id,
                    Status = t.Status,
                    RegistrationDate = t.RegistrationDate
                }).OrderBy(t => t.RegistrationDate).ToList()
            }).ToList();
        }
    }
}
