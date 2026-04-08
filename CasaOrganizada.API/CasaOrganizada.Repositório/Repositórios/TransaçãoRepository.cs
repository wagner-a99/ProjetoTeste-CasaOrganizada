using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Repositório.Data;
using CasaOrganizada.Repositório.Repositórios.Interfaces;

namespace CasaOrganizada.Repositório.Repositórios
{
    public class TransaçãoRepository : ITransaçãoRepository
    {
        private readonly CasaOrganizadaContext _context;

        public TransaçãoRepository(CasaOrganizadaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transação>> BuscarTransações()
        {
            return _context.Transação.ToList();
        }

        public async Task<Transação> BuscarTransação(int identificadorTransação)
        {
            return _context.Transação.Find(identificadorTransação);
        }

        public async Task<IEnumerable<Transação>> BuscarTransaçõesPorPessoa(int identificadorPessoa)
        {
            return _context.Transação.Where(t => t.Pessoa.Id == identificadorPessoa).ToList();
        }

        public void AdicionarTransação(Transação transação)
        {
            _context.Attach(transação.Categoria);
            _context.Attach(transação.Pessoa);

            _context.Transação.Add(transação);
            _context.SaveChanges();
        }

        void ITransaçãoRepository.DeletarTransação(Transação transação)
        {
            _context.Transação.Remove(transação);
        }
    }
}
