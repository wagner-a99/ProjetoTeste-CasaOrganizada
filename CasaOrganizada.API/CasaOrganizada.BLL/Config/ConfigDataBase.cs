using CasaOrganizada.Repositório.Data;

namespace CasaOrganizada.BLL.Config
{
    public class ConfigDataBase
    {
        public ConfigDataBase()
        {
            new CasaOrganizadaContext();
        }
    }
}
