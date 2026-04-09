using CasaOrganizada.Domínio.Models;
using FluentValidation;

namespace CasaOrganizada.Domínio.Validação
{
    public class CategoriaValidator : AbstractValidator<Categoria>
    {
        public CategoriaValidator()
        {
            RuleFor(c => c.Descrição)
            .NotNull().WithMessage("A descrição da categoria não pode ser nula.")
            .Length(1, 400).WithMessage("A descrição do item deve ter entre {MinLength} e {MaxLength} caracteres.");

            RuleFor(c => c.Finalidade).IsInEnum()
                .WithMessage("Campo Finalidade com valor fora do intervalo definido.");
        }
    }
}
