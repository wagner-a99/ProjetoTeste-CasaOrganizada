using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.BLL.Services;
using CasaOrganizada.Repositório.Data;
using CasaOrganizada.Repositório.Repositórios;
using CasaOrganizada.Repositório.Repositórios.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CasaOrganizada.BLL
{
    public static class DependencyInjectorHelper
    {
        public static void InjetarDependências(this IServiceCollection serviços)
        {
            serviços.AddTransient<IPessoaService, PessoaService>();
            serviços.AddTransient<ICategoriaService, CategoriaService>();
            serviços.AddTransient<ITransaçãoService, TransaçãoService>();
            serviços.AddTransient<IPessoaRepository, PessoaRepository>();
            serviços.AddTransient<ICategoriaRepository, CategoriaRepository>();
            serviços.AddTransient<ITransaçãoRepository, TransaçãoRepository>();
            serviços.AddTransient<CasaOrganizadaContext, CasaOrganizadaContext>();
        }
    }
}
