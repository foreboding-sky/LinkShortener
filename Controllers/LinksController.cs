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
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ILinksRepository repository;
        private readonly UserManager<User> userManager;
        private readonly IServer server;
        private readonly IMapper mapper;
        private LinkShortenerService linkShortener;

        public LinksController(ILinksRepository repository, UserManager<User> userManager, IServer server, IMapper mapper, LinkShortenerService linkShortener)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.server = server;
            this.mapper = mapper;
            this.linkShortener = linkShortener;
        }

        [HttpGet("")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllLinks()
        {
            var links = await repository.GetAllLinks();
            return Ok(mapper.Map<IEnumerable<LinkReadDto>>(links));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLink(Guid id)
        {
            var link = await repository.GetLinkById(id);
            return Ok(mapper.Map<LinkReadDto>(link));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteLink(Guid id)
        {
            var user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            var isAdmin = await userManager.IsInRoleAsync(user, "Administrator");
            if ((await repository.GetLinkById(id)).CreatedBy.Id == user.Id || isAdmin)
            {
                await repository.DeleteLink(id);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("")]
        [Authorize]
        public async Task<IActionResult> AddLink([FromBody] LinkCreateDto linkDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            Link link = mapper.Map<Link>(linkDto);
            link.CreatedBy = user;
            link.CreatedDate = DateTime.UtcNow;
            await repository.CreateLink(link);
            return Ok(linkShortener.GetShortLink(link));
        }
    }
}