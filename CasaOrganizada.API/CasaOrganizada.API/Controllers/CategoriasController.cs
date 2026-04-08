using CasaOrganizada.BLL.Interfaces;
using CasaOrganizada.Domínio.Models;
using Microsoft.AspNetCore.Mvc;

namespace CasaOrganizada.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _serviço;

        public CategoriasController(ICategoriaService serviço)
        {
            _serviço = serviço;
        }

        //GET: api/categorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoria()
        {
            try
            {
                var categorias = await _serviço.BuscarCategorias();
                return Ok(categorias);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //GET: api/categorias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            try
            {
                var categoria = _serviço.BuscarCategoria(id);
                if (categoria == null)
                {
                    return NotFound();
                }

                return Ok(categoria);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //POST: api/categorias
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            try
            {
                _serviço.AdicionarCategoria(categoria);

                return CreatedAtAction("GetCategoria", new { id = categoria.Id }, categoria);
            }
            catch (Exception exceção)
            {
                return BadRequest(new { message = exceção.Message });
            }
        }
    }
}
