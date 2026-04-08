using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Domínio.Validação;
using CasaOrganizada.Repositório.Repositórios.Interfaces;
using FluentValidation;

namespace CasaOrganizada.BLL.Services
{
    public class TransaçãoService : ITransaçãoService
    {
        private ITransaçãoRepository _transaçãoRepository;
        private ICategoriaRepository _categoriaRepository;
        private IPessoaRepository _pessoaRepository;

        public TransaçãoService(ITransaçãoRepository transaçãoRepository, ICategoriaRepository categoriaRepository, IPessoaRepository pessoaRepository)
        {
            _transaçãoRepository = transaçãoRepository;
            _categoriaRepository = categoriaRepository;
            _pessoaRepository = pessoaRepository;
        }

        public async Task<IEnumerable<Transação>> BuscarTransações()
        {
            var transações = await _transaçãoRepository.BuscarTransações();
            return transações;
        }

        public async Task<Transação> BuscarTransação(int identificadorTransação)
        {
            var transação = await _transaçãoRepository.BuscarTransação(identificadorTransação);
            return transação;
        }

        public async Task<IEnumerable<Transação>> BuscarTransaçõesPorPessoa(int identificadorPessoa)
        {
            var transações = await _transaçãoRepository.BuscarTransaçõesPorPessoa(identificadorPessoa);
            return transações;
        }

        public async Task AdicionarTransação(Transação transação)
        {
            transação.Categoria = await _categoriaRepository.BuscarCategoria(transação.CategoriaId);
            transação.Pessoa = await _pessoaRepository.BuscarPessoa(transação.PessoaId);

            var validador = new TransaçãoValidator();
            validador.ValidateAndThrow(transação);

            _transaçãoRepository.AdicionarTransação(transação);
        }

        public async Task DeletarTransação(Transação transação)
        {
            _transaçãoRepository.DeletarTransação(transação);
        }
    }
}
