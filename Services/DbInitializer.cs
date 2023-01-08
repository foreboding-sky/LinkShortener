using InforceTestingApp.Models;
using Microsoft.AspNetCore.Identity;

namespace InforceTestingApp.Services
{
    public class DbInitializer
    {
        public readonly UserManager<User> userManager;
        public readonly RoleManager<IdentityRole<Guid>> roleManager;

        public DbInitializer(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        public async Task Populate()
        {
            var identityUser = new User { UserName = "Admin" };
            var result = await userManager.CreateAsync(identityUser, "admin");
            if (result.Succeeded)
            {

                var isRoleExist = await roleManager.RoleExistsAsync("Administrator");
                if (!isRoleExist)
                {
                    var newRole = new IdentityRole<Guid> { Name = "Administrator" };
                    await roleManager.CreateAsync(newRole);
                }

                await userManager.AddToRoleAsync(identityUser, "Administrator");
            }
        }
    }
}