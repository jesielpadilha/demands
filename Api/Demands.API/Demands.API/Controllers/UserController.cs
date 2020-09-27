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
    public class UserController : ControllerBase<User, IUserService>
    {
        private readonly IUserService _service;

        public UserController(IUserService service) : base(service)
        {
            _service = service;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult Create([FromBody] User user)
        {
            _service.AddUser(user);
            return Ok(true);
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update([FromBody] User user)
        {
            _service.Update(user);
            return Ok(true);
        }

        [HttpGet("get-list-user-type")]
        [Authorize]
        public IList<UserType> GetListUserType()
        {
            return Enum.GetValues(typeof(UserType)).Cast<UserType>().ToList();
        }

        [HttpPost("update-password/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdatePassword(int id, [FromBody] string password)
        {
            var user = _service.GetById(id);
            if (user == null) return NotFound();

            _service.UpdatePassword(user, password);
            return Ok();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] User user)
        {
            var userFound = _service.Login(user.Username, user.Password);
            if (userFound == null) return NotFound();

            return Ok(userFound);
        }
    }
}
