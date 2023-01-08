using AutoMapper;
using InforceTestingApp.Data;
using InforceTestingApp.Models;
using InforceTestingApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InforceTestingApp.Controllers
{
    [Route("")]
    [ApiController]
    public class RedirectController : ControllerBase
    {
        private readonly ILinksRepository repository;

        public RedirectController(ILinksRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("{shortLink}")]
        [AllowAnonymous]
        public async Task<IActionResult> RedirectToLink(string shortLink)
        {
            string redirectUrl = (await repository.GetLinkByShort(shortLink)).LongLink;
            return Redirect(redirectUrl);
        }
    }
}