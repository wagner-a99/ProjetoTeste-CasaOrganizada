using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.Repositório.Repositórios.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<Categoria> BuscarCategoria(int identificadorCategoria);
        Task<IEnumerable<Categoria>> BuscarCategorias();
        void AdicionarCategoria(Categoria categoria);
    }
}
