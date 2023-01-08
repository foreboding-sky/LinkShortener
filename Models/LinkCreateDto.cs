using FluentValidation;

namespace InforceTestingApp.Models
{
    public class LinkCreateDto
    {
        public string LongLink { get; set; }
    }

    public class LinkCreateDtoValidator : AbstractValidator<LinkCreateDto>
    {
        public LinkCreateDtoValidator()
        {
            RuleFor(l => l.LongLink).Matches(@"(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")
                                    .NotEmpty()
                                    .WithMessage("Invalid Url");
        }
    }
}