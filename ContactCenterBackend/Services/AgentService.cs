using Supabase;
using ContactCenterBackend.Models;
using SupabaseClient = Supabase.Client;

namespace ContactCenterBackend.Services
{
    public class AgentService
    {
        private readonly SupabaseClient _supabaseClient;

        public AgentService(SupabaseClient supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<IEnumerable<Agent>> GetAllAgentsAsync()
        {
            // Consulta la tabla "agents" en Supabase
            var response = await _supabaseClient.From<Agent>().Get();
            return response.Models;
        }

        public async Task AddOrUpdateAgentAsync(Agent agent)
        {
            // Inserta o actualiza el registro en Supabase
            await _supabaseClient.From<Agent>().Upsert(agent);
        }
    }
}
