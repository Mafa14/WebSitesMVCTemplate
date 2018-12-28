using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Seed
{
    public class IdentityContextSeed
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser { UserName = "msilva", Email = "m.silva.gambardelo@gmail.com" };
            await userManager.CreateAsync(defaultUser, "Pass@word1");
        }
    }
}
