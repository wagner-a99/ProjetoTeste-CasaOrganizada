using CasaOrganizada.Domínio.Enums;

namespace CasaOrganizada.Domínio.Models
{
    public class Transação
    {
        public int Id { get; set; }
        public string Descrição { get; set; }
        public decimal Valor { get; set; }
        public TipoTransação Tipo { get; set; }
        public int CategoriaId { get; set; }
        public int PessoaId { get; set; }
        public virtual Categoria? Categoria { get; set; }
        public virtual Pessoa? Pessoa { get; set; }
    }
}
