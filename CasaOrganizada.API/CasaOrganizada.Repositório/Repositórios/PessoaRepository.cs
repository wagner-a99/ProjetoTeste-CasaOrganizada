using CasaOrganizada.Domínio.Models;
using CasaOrganizada.Repositório.Data;
using CasaOrganizada.Repositório.Repositórios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CasaOrganizada.Repositório.Repositórios
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly CasaOrganizadaContext _context;

        public PessoaRepository(CasaOrganizadaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pessoa>> BuscarPessoas()
        {
            return await _context.Pessoa.ToListAsync();
        }

        public async Task<Pessoa> BuscarPessoa(int identificadorPessoa)
        {
            return await _context.Pessoa.FindAsync(identificadorPessoa);
        }

        public void AdicionarPessoa(Pessoa pessoa)
        {
            _context.Pessoa.Add(pessoa);
            _context.SaveChanges();
        }

        public void AlterarPessoa(int identificadorPessoa, Pessoa pessoa)
        {
            _context.Entry(pessoa).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeletarPessoa(Pessoa pessoa)
        {
            _context.Pessoa.Remove(pessoa);
            _context.SaveChangesAsync();
        }
    }
}
