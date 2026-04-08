using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Domínio.Validação;
using CasaOrganizada.Repositório.Repositórios.Interfaces;
using FluentValidation;

namespace CasaOrganizada.BLL.Services
{
    public class PessoaService : IPessoaService
    {
        private IPessoaRepository _pessoaRepository;
        private ITransaçãoService _transaçãoService;

        public PessoaService(IPessoaRepository pessoaRepository, ITransaçãoService transaçãoService)
        {
            _pessoaRepository = pessoaRepository;
            _transaçãoService = transaçãoService;
        }

        public async Task<IEnumerable<Pessoa>> BuscarPessoas()
        {
            var pessoas = _pessoaRepository.BuscarPessoas().Result.ToList();
            return pessoas;
        }

        public async Task<Pessoa> BuscarPessoa(int identificadorPessoa)
        {
            return await _pessoaRepository.BuscarPessoa(identificadorPessoa);
        }

        public void AdicionarPessoa(Pessoa pessoa)
        {
            try
            {
                var validador = new PessoaValidator();
                validador.ValidateAndThrow(pessoa);

                _pessoaRepository.AdicionarPessoa(pessoa);
            }
            catch (ValidationException exceção)
            {
                var mensagemValidação = "Erro Validação:";

                exceção.Errors
                       .ToList()
                       .ForEach(e => mensagemValidação += $"\n {e.PropertyName}: {e.ErrorMessage}");

                throw new Exception(mensagemValidação);
            }
        }

        public void AlterarPessoa(int identificadorPessoa, Pessoa pessoa)
        {
            try
            {
                var validador = new PessoaValidator();
                validador.ValidateAndThrow(pessoa);

                _pessoaRepository.AlterarPessoa(identificadorPessoa, pessoa);
            }
            catch (ValidationException exceção)
            {
                var mensagemValidação = "Erro Validação:";

                exceção.Errors
                       .ToList()
                       .ForEach(e => mensagemValidação += $"\n {e.PropertyName}: {e.ErrorMessage}");

                throw new Exception(mensagemValidação);
            }
        }

        public async Task DeletarPessoa(Pessoa pessoa)
        {
            //Deletar todas as transações correspondentes da Pessoa
            var transações = await _transaçãoService.BuscarTransaçõesPorPessoa(pessoa.Id);
            foreach (var transação in transações)
            {
                _transaçãoService.DeletarTransação(transação);
            }

            _pessoaRepository.DeletarPessoa(pessoa);
        }
    }
}
