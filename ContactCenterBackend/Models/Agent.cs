using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ContactCenterBackend.Models
{
    [Table("agents")]
    public class Agent : BaseModel
    {
        [PrimaryKey("id", false)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Column("name")]
        public string? Name { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("wait_time")]
        public int WaitTime { get; set; }
    }
}
