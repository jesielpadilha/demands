using System.Collections.Generic;
using Demands.Domain.Interfaces.Repositories;
using Demands.Domain.Interfaces.Services;

namespace Demands.Domain.Services
{
    public class ServiceBase<TEntity> : IServiceBase<TEntity> where TEntity : class
    {
        private readonly IRepositoryBase<TEntity> _repository;

        public ServiceBase(IRepositoryBase<TEntity> repository)
        {
            _repository = repository;
        }

        public void Add(TEntity obj)
        {
            _repository.Add(obj);
        }

        public IList<TEntity> GetAll()
        {
            return _repository.GetAll();
        }

        public TEntity GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void UpdateAll(TEntity obj)
        {
            _repository.UpdateAll(obj);
        }

        public void Remove(TEntity obj)
        {
            _repository.Remove(obj);
        }

        public bool IsEntityExists(int id)
        {
            return _repository.IsEntityExists(id);
        }
    }
}
