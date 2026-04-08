using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using Microsoft.AspNetCore.Mvc;

namespace CasaOrganizada.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _serviço;

        public PessoaController(IPessoaService serviço)
        {
            _serviço = serviço;
        }

        //GET: api/pessoa
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoa()
        {
            try
            {
                var pessoas = await _serviço.BuscarPessoas();
                return Ok(pessoas);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //GET: api/pessoa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetPessoa(int id)
        {
            try
            {
                var pessoa = await _serviço.BuscarPessoa(id);
                if (pessoa == null)
                {
                    return NotFound();
                }

                return pessoa;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //PUT: api/pessoa/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoa(int id, Pessoa pessoa)
        {
            try
            {
                if (id != pessoa.Id)
                    return BadRequest();

                _serviço.AlterarPessoa(id, pessoa);
            }
            catch (Exception exceção)
            {
                return BadRequest(new { message = exceção.Message });
            }

            return NoContent();
        }

        //POST: api/pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
        {
            try
            {
                _serviço.AdicionarPessoa(pessoa);

                return CreatedAtAction("GetPessoa", new { id = pessoa.Id }, pessoa);
            }
            catch (Exception exceção)
            {
                return BadRequest(new { message = exceção.Message });
            }
        }

        //DELETE: api/pessoa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            try
            {
                var pessoa = await _serviço.BuscarPessoa(id);
                if (pessoa == null)
                {
                    return NotFound();
                }

                _serviço.DeletarPessoa(pessoa);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
