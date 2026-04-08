using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Domínio.Validação;
using CasaOrganizada.Repositório.Repositórios.Interfaces;
using FluentValidation;

namespace CasaOrganizada.BLL.Services
{
    public class CategoriaService : ICategoriaService
    {
        private ICategoriaRepository _repository;

        public CategoriaService(ICategoriaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Categoria>> BuscarCategorias()
        {
            return await _repository.BuscarCategorias();
        }

        public async Task<Categoria> BuscarCategoria(int identificadorCategoria)
        {
            return await _repository.BuscarCategoria(identificadorCategoria);
        }

        public void AdicionarCategoria(Categoria categoria)
        {
            try
            {
                var validador = new CategoriaValidator();
                validador.ValidateAndThrow(categoria);

                _repository.AdicionarCategoria(categoria);
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
    }
}
