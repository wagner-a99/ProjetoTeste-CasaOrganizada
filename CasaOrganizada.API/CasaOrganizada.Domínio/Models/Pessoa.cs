using System.Text.Json.Serialization;

namespace CasaOrganizada.Domínio.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }

        [JsonIgnore]
        public virtual ICollection<Transação>? Transações { get; set; }
    }
}
