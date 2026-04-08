using CasaOrganizada.Domínio.Models;

namespace CasaOrganizada.Repositório.Repositórios.Interfaces
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<Pessoa>> BuscarPessoas();
        Task<Pessoa> BuscarPessoa(int identificadorPessoa);
        void AdicionarPessoa(Pessoa pessoa);
        void AlterarPessoa(int identificadorPessoa, Pessoa pessoa);
        void DeletarPessoa(Pessoa pessoa);
    }
}
