using System;
using System.Linq;
using Demands.API.ViewModels;
using Demands.Domain.Entities;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase<Bill, IBillService>
    {
        private readonly IBillService _service;
        public BillController(IBillService service) : base(service)
        {
            _service = service;
        }

        [HttpPost("close-bill")]
        [Authorize]
        public IActionResult CloseBill([FromBody] PaymentBillViewModel paymentBill)
        {
            var bill = _service.GetById(paymentBill.BillId);
            if (bill == null) return NotFound(false);

            if (!Enum.GetValues(typeof(PaymentMethod)).Cast<PaymentMethod>().Any(m => m.Equals(paymentBill.PaymentMethod)))
                return NotFound(false);

            return Ok(_service.CloseBill(bill, paymentBill.PaymentMethod));
        }
    }
}