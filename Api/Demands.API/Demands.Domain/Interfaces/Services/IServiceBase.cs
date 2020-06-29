using System.Collections.Generic;

namespace Demands.Domain.Interfaces.Services
{
    public interface IServiceBase<TEntity> where TEntity : class
    {
        void Add(TEntity obj);

        TEntity GetById(int id);

        IList<TEntity> GetAll();

        void UpdateAll(TEntity obj);

        void Remove(TEntity obj);

        bool IsEntityExists(int id);
    }
}
