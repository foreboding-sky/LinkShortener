using AutoMapper;
using InforceTestingApp.Models;
using InforceTestingApp.Services;

namespace InforceTestingApp.Profiles
{
    public class LinkProfile : Profile
    {
        public LinkProfile()
        {
            CreateMap<LinkCreateDto, Link>();
            CreateMap<Link, LinkReadDto>().ForMember(dto => dto.CreatedBy, link => link.MapFrom(x => x.CreatedBy.UserName))
                .AfterMap<LinkReadDtoAction>();
        }
    }
    public class LinkReadDtoAction : IMappingAction<Link, LinkReadDto>
    {
        private readonly LinkShortenerService linkShortener;
        public LinkReadDtoAction(LinkShortenerService linkShortener)
        {
            this.linkShortener = linkShortener;
        }

        public void Process(Link source, LinkReadDto destination, ResolutionContext context)
        {
            destination.ShortLink = linkShortener.GetShortLink(source);
        }
    }
}