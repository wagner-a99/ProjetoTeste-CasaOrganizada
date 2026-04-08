using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.Repositório.Repositórios.Interfaces
{
    public interface ITransaçãoRepository
    {
        Task<IEnumerable<Transação>> BuscarTransações();
        Task<Transação> BuscarTransação(int identificadorTransação);
        Task<IEnumerable<Transação>> BuscarTransaçõesPorPessoa(int identificadorPessoa);
        void AdicionarTransação(Transação transação);
        void DeletarTransação(Transação transação);
    }
}
