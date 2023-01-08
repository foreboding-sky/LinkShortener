namespace InforceTestingApp.Models
{
    public class Link
    {
        public Guid Id { get; set; }
        public string LongLink { get; set; }
        public string ShortLink { get; set; }
        public DateTime CreatedDate { get; set; }
        public User CreatedBy { get; set; }
    }
}