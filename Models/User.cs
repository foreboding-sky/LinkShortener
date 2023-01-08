using Microsoft.AspNetCore.Identity;

namespace InforceTestingApp.Models
{
    public class User : IdentityUser<Guid>
    {
        public List<Link> CreatedLinks { get; set; }
    }
}
