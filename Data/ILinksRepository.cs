using InforceTestingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InforceTestingApp.Data
{
    public interface ILinksRepository
    {
        public Task<Link> CreateLink(Link link);
        public Task DeleteLink(Guid id);
        public Task<List<Link>> GetAllLinks();
        public Task<Link> GetLinkById(Guid id);
        public Task<Link> GetLinkByShort(string shortLink);
        public Task<Link> GetLinkByLong(string longLink);
    }
}