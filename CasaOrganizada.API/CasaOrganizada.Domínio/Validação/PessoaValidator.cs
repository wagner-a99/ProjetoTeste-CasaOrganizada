using CasaOrganizada.Domínio.Models;
using FluentValidation;

namespace CasaOrganizada.Domínio.Validação
{
    public class PessoaValidator : AbstractValidator<Pessoa>
    {
        public PessoaValidator()
        {
            RuleFor(v => v.Nome)
                .NotNull().WithMessage("O nome da pessoa não pode ser nula.")
                .Length(1, 200).WithMessage("O nome da pessoa deve ter entre {MinLength} e {MaxLength} caracteres.");

            RuleFor(v => v.Idade)
                .NotNull().WithMessage("A idade da pessoa não pode ser nula.")
                .GreaterThan(0).WithMessage("A idade da pessoa não pode ser menor que {ComparisonValue}.");
        }
    }
}
