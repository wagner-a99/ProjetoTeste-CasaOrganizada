using CasaOrganizada.Domínio.Enums;
using CasaOrganizada.Domínio.Models;
using FluentValidation;

namespace CasaOrganizada.Domínio.Validação
{
    public class TransaçãoValidator : AbstractValidator<Transação>
    {
        public TransaçãoValidator()
        {
            RuleFor(t => t.Descrição)
                .NotNull().WithMessage("A descrição da transação não pode ser nula.")
                .Length(1, 400).WithMessage("A descrição da transição deve ter entre {MinLength} e {MaxLength} caracteres.");

            RuleFor(t => t.Valor)
                .GreaterThan(0).WithMessage("O valor da transação deve ser maior que zero.");

            RuleFor(t => t.Tipo).IsInEnum()
                .WithMessage("Campo Tipo de transação com valor fora do intervalo definido.");

            RuleFor(t => t.CategoriaId)
               .NotEqual(0).WithMessage("A categoria não pode ser nula.");

            //Validação: Caso Transação do tipo 'Despesa' seja de uma categoria com finalidade 'Receita', lançar exceção.
            RuleFor(x => x.Tipo)
                .NotEqual(TipoTransação.Despesa)
                .When(c => c.Categoria?.Finalidade == TipoFinalidade.Receita)
                .WithMessage("Transação do tipo 'Despesa' não pode ser de categoria com finalidade 'Receita'.");

            //Validação: Caso Transação do tipo 'Receita' seja de uma categoria com finalidade 'Despesa', lançar exceção.
            RuleFor(x => x.Tipo)
                .NotEqual(TipoTransação.Receita)
                .When(c => c.Categoria?.Finalidade == TipoFinalidade.Despesa)
                .WithMessage("Transação do tipo 'Receita' não pode ser de categoria com finalidade 'Despesa'.");

            RuleFor(t => t.Pessoa)
                .NotNull().WithMessage("A pessoa da transação não pode ser nula.");

            //Validação: Caso Transação do tipo 'Receita' e pessoa com idade menor de 18, lançar exceção.
            RuleFor(t => t.Tipo)
                .NotEqual(TipoTransação.Receita)
                .When(p => p.Pessoa?.Idade < 18)
                .WithMessage("Apenas transações do tipo despesa são aceitas para pessoas menores de 18 anos.");
        }
    }
}
