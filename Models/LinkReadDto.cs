namespace InforceTestingApp.Models
{
    public class LinkReadDto
    {
        public Guid Id { get; set; }
        public string LongLink { get; set; }
        public string ShortLink { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}