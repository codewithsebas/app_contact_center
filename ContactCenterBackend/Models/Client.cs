using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ContactCenterBackend.Models
{
    [Table("clients")]
    public class Client : BaseModel
    {
        [PrimaryKey("id", false)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Column("name")]
        public string? Name { get; set; }

        [Column("wait_time")]
        public int WaitTime { get; set; }
    }
}
