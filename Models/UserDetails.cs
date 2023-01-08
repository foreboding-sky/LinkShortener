using FluentValidation;

namespace InforceTestingApp.Models
{
    public class UserDetails
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserDetailsValidator : AbstractValidator<UserDetails>
    {
        public UserDetailsValidator()
        {
            RuleFor(u => u.UserName).NotEmpty().WithMessage("Please enter your username.");
            RuleFor(u => u.Password).NotEmpty().WithMessage("Please enter your password.");
        }
    }
}