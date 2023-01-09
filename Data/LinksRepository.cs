using InforceTestingApp.Models;
using InforceTestingApp.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InforceTestingApp.Data
{
    public class LinksRepository : ILinksRepository
    {
        private readonly ApplicationDbContext context;
        LinkShortenerService linkShortener;

        public LinksRepository(ApplicationDbContext context, LinkShortenerService linkShortener)
        {
            this.context = context;
            this.linkShortener = linkShortener;
        }

        public async Task<Link> CreateLink(Link link)
        {
            context.Links.Add(link);
            link.ShortLink = linkShortener.ShortenLink(link);
            await context.SaveChangesAsync();
            return link;
        }

        public async Task DeleteLink(Guid id)
        {
            var tmp = context.Links.Find(id);
            context.Links.Remove(tmp);
            await context.SaveChangesAsync();
        }

        public async Task<List<Link>> GetAllLinks()
        {
            return await context.Links.Include(l => l.CreatedBy).ToListAsync();
        }

        public async Task<Link> GetLinkById(Guid id)
        {
            return await context.Links.Include(l => l.CreatedBy).FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<Link> GetLinkByShort(string shortLink)
        {
            return await context.Links.Include(l => l.CreatedBy).FirstOrDefaultAsync(l => l.ShortLink == shortLink);
        }

        public async Task<Link> GetLinkByLong(string longLink)
        {
            return await context.Links.FirstOrDefaultAsync(l => l.LongLink == longLink);
        }
    }
}