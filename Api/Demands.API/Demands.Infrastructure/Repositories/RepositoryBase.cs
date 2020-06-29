using System.Collections.Generic;
using System.Linq;
using Demands.Domain.Interfaces.Repositories;
using Demands.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Demands.Infrastructure.Repositories
{
    public class RepositoryBase<TEntity, TContext> : IRepositoryBase<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        private readonly TContext _context;

        public RepositoryBase(TContext context)
        {
            _context = context;
        }

        public void Add(TEntity obj)
        {
            _context.Set<TEntity>().Add(obj);
            _context.SaveChanges();
        }

        public TEntity GetById(int id)
        {
            return _context.Set<TEntity>().Find(id);
        }

        public IList<TEntity> GetAll()
        {
            return _context.Set<TEntity>().ToList();
        }

        public void UpdateAll(TEntity obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(TEntity obj)
        {
            _context.Set<TEntity>().Remove(obj);
            _context.SaveChanges();
        }

        public bool IsEntityExists(int id)
        {
            var entity = _context.Set<TEntity>().Find(id);
            //_context.Entry(entity).State = EntityState.Detached;

            return entity != null;
        }
    }
}
