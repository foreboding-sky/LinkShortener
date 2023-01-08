using InforceTestingApp.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.WebUtilities;

namespace InforceTestingApp.Services
{
    public class LinkShortenerService
    {
        private readonly IServer server;
        public LinkShortenerService(IServer server)
        {
            this.server = server;
        }
        public string GetShortLink(Link link)
        {
            var address = server.Features.Get<IServerAddressesFeature>().Addresses.First();
            return address + "/" + link.ShortLink;
        }
        public string ShortenLink(Link link)
        {
            return WebEncoders.Base64UrlEncode(link.Id.ToByteArray());
        }
    }
}
