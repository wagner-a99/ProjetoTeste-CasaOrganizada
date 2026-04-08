using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using Microsoft.AspNetCore.Mvc;

namespace CasaOrganizada.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaçãoController : ControllerBase
    {
        private readonly ITransaçãoService _serviço;

        public TransaçãoController(ITransaçãoService serviço)
        {
            _serviço = serviço;
        }

        //GET: api/transação
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transação>>> GetTransação()
        {
            try
            {
                var transações = await _serviço.BuscarTransações();
                return Ok(transações);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //GET: api/transação/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transação>> GetTransação(int id)
        {
            try
            {
                var transação = await _serviço.BuscarTransação(id);
                if (transação == null)
                {
                    return NotFound();
                }

                return transação;
            }
            catch (Exception)
            {
                throw;
            }            
        }

        //POST: api/transação
        [HttpPost]
        public async Task<ActionResult<Transação>> PostTransação(Transação transação)
        {
            try
            {
                await _serviço.AdicionarTransação(transação);

                return CreatedAtAction("GetTransação", new { id = transação.Id }, transação);
            }
            catch (Exception exceção)
            {
                return BadRequest(new { message = exceção.Message });
            }
        }
    }
}
