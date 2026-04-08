using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.BLL.Interfaces
{
    public interface ITransaçãoService
    {
        Task<IEnumerable<Transação>> BuscarTransações();
        Task<Transação> BuscarTransação(int identificadorTransação);
        Task<IEnumerable<Transação>> BuscarTransaçõesPorPessoa(int identificadorPessoa);
        Task AdicionarTransação(Transação transação);
        Task DeletarTransação(Transação transação);
    }
}
