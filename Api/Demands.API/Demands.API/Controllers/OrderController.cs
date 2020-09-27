using System;
using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;
        private readonly ITrackOrderService _trackOrderService;
        private readonly IUserService _userService;
        public OrderController(IOrderService service, ITrackOrderService trackOrerService, IUserService userService)
        {
            _service = service;
            _trackOrderService = trackOrerService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public IList<Order> Get()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var order = _service.GetById(id);
            if (order == null) return NotFound();

            return Ok(new Order
            {
                Id = order.Id,
                Observation = order.Observation,
                TableId = order.TableId,
                ProductsOrder = order.ProductsOrder.Select(p => new ProductOrder
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
                TrackersOrder = order.TrackersOrder.Select(t => new TrackOrder
                {
                    Id = t.Id,
                    Status = t.Status,
                    RegistrationDate = t.RegistrationDate
                }).OrderBy(t => t.RegistrationDate).ToList()
            });
        }

        [HttpPost("{userId}")]
        [Authorize]
        public IActionResult Post(int userId, [FromBody] Order order)
        {
            if (userId == 0 || order.ProductsOrder.Count == 0)
                return Ok(false);

            _service.CreateOrder(userId, order);

            return Ok(true);
        }

        [HttpGet("orders-by-table/{id}")]
        [Authorize]
        public IList<Order> OrdersByTableId(int id)
        {
            var orders = _service.OrdersByTableId(id);
            return orders.Select(o => new Order
            {
                Id = o.Id,
                Observation = o.Observation,
                TableId = o.TableId,
                BillId = o.BillId,
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

        [HttpGet("get-orders-opened")]
        [Authorize]
        public IList<Order> GetOpenedOrders()
        {
            return _service.GetOpenedOrders().Select(o => new Order
            {
                Id = o.Id,
                Table = new Table
                {
                    Id = o.Table.Id,
                    Number = o.Table.Number
                },
                ProductsOrder = o.ProductsOrder.Select(p => new ProductOrder
                {
                    Id = p.Id,
                    Amount = p.Amount,
                    Product = p.Product,
                    OrderId = p.OrderId,
                    ProductOrderIngredients = p.ProductOrderIngredients != null ? p.ProductOrderIngredients.ToList() : new List<ProductOrderIngredient>()
                }).ToList(),
                TrackersOrder = o.TrackersOrder != null
                    ? o.TrackersOrder.Select(t => new TrackOrder
                    {
                        Status = t.Status,
                        RegistrationDate = t.RegistrationDate
                    }).ToList()
                    : new List<TrackOrder>(),
                Observation = o.Observation
            }).ToList();
        }

        [HttpPost("set-status-order")]
        [Authorize]
        public IActionResult SetStatusOrder([FromBody] TrackOrder trackOrder)
        {
            if (!Enum.GetValues(typeof(StatusOrder)).Cast<StatusOrder>().Contains(trackOrder.Status))
            {
                return NotFound("Status not found");
            }
            var order = _service.GetById(trackOrder.OrderId);
            if (order == null)
            {
                return NotFound("Order not found");
            }
            if (!_userService.IsEntityExists(trackOrder.UserId))
            {
                return NotFound("User not found");
            }
            if (order.TrackersOrder.LastOrDefault().Status == trackOrder.Status)
                return Ok(true);

            trackOrder.RegistrationDate = DateTime.Now;
            _trackOrderService.Add(trackOrder);
            return Ok(true);
        }
    }
}