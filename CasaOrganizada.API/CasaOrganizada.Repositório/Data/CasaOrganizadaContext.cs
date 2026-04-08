using Microsoft.EntityFrameworkCore;

namespace CasaOrganizada.Repositório.Data
{
    public class CasaOrganizadaContext : DbContext
    {
        public string databasePath { get; }

        public CasaOrganizadaContext()
        {
            //Pega a pasta onde a aplicação (API) está rodando no momento, para localizar DB.
            var pasta = AppDomain.CurrentDomain.BaseDirectory;
            databasePath = Path.Combine(pasta, "DB", "CasaOrganizada.db");

            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={databasePath}");

        public DbSet<Domínio.Models.Pessoa> Pessoa { get; set; } = default!;
        public DbSet<Domínio.Models.Categoria> Categoria { get; set; } = default!;
        public DbSet<Domínio.Models.Transação> Transação { get; set; } = default!;
    }
}
