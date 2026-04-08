using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.BLL.Interfaces
{
    public interface ICategoriaService
    {
        Task<Categoria> BuscarCategoria(int identificadorCategoria);
        Task<IEnumerable<Categoria>> BuscarCategorias();
        void AdicionarCategoria(Categoria categoria);
    }
}
