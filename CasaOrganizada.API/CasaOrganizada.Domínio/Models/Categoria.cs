using CasaOrganizada.Domínio.Enums;

namespace CasaOrganizada.Domínio.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Descrição { get; set; }
        public TipoFinalidade Finalidade { get; set; }
    }
}
