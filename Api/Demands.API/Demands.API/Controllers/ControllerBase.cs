using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Demands.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public abstract class ControllerBase<TEntity, TService> : ControllerBase
        where TEntity : class
        where TService : IServiceBase<TEntity>
    {
        private readonly TService _service;

        protected ControllerBase(TService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public IList<TEntity> Get()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var entity = _service.GetById(id);
            if (entity == null) return NotFound();

            return Ok(entity);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] TEntity entity)
        {
            _service.Add(entity);
			return Ok(true);
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody] TEntity entity)
        {
            var idProperty = entity.GetType().GetProperties().FirstOrDefault(p => p.Name.Equals("Id"));
            if (idProperty == null)
                return BadRequest(false);

            var entityId = int.Parse(idProperty.GetValue(entity).ToString());

            //TODO: think in a way to valid if the entity really exists without block the Update method
            //var entityFound = _service.IsEntityExists(entityId);
            //if (!entityFound)
            //    return NotFound(false);

            _service.UpdateAll(entity);
			return Ok(true);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var entity = _service.GetById(id);
            if (entity == null) return NotFound();

            _service.Remove(entity);
            return Ok(true);
        }
    }
}
