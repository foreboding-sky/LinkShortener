using InforceTestingApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InforceTestingApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            EnsurePopulated();
        }

        public DbSet<Link> Links { get; set; }
        public DbSet<User> Users { get; set; }

        private void EnsurePopulated()
        {

        }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);
            mb.HasPostgresExtension("uuid-ossp");

            mb.Entity<User>().HasMany(u => u.CreatedLinks).WithOne(l => l.CreatedBy).OnDelete(DeleteBehavior.Cascade);

            mb.Entity<User>().Property(user => user.Id).HasDefaultValueSql("uuid_generate_v4()");
            mb.Entity<IdentityRole<Guid>>().Property(role => role.Id).HasDefaultValueSql("uuid_generate_v4()");
        }
    }
}