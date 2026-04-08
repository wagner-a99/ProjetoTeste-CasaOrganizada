using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Repositório.Data;
using CasaOrganizada.Repositório.Repositórios.Interfaces;

namespace CasaOrganizada.Repositório.Repositórios
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly CasaOrganizadaContext _context;

        public CategoriaRepository(CasaOrganizadaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Categoria>> BuscarCategorias()
        {
            return _context.Categoria.ToList();
        }

        public async Task<Categoria> BuscarCategoria(int identificadorCategoria)
        {
            return _context.Categoria.Find(identificadorCategoria);
        }

        public void AdicionarCategoria(Categoria categoria)
        {
            _context.Categoria.Add(categoria);
            _context.SaveChanges();
        }
    }
}
