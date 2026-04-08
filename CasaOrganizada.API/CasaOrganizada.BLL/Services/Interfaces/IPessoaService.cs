using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.BLL.Interfaces
{
    public interface IPessoaService
    {
        Task<Pessoa> BuscarPessoa(int identificadorPessoa);
        Task<IEnumerable<Pessoa>> BuscarPessoas();
        void AdicionarPessoa(Pessoa pessoa);
        void AlterarPessoa(int identificadorPessoa, Pessoa pessoa);
        Task DeletarPessoa(Pessoa pessoa);
    }
}
