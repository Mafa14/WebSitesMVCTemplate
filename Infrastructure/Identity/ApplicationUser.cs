using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string DocumentId { get; set; }
        public string Address { get; set; }
    }
}
