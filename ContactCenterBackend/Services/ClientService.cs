using SupabaseClient = Supabase.Client;
using Client = ContactCenterBackend.Models.Client;

namespace ContactCenterBackend.Services
{
    public class ClientService
    {
        private readonly SupabaseClient _supabaseClient;

        public ClientService(SupabaseClient supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            // Consulta la tabla "clients" en Supabase
            var response = await _supabaseClient.From<Client>().Get();
            return response.Models;
        }

        public async Task AddOrUpdateClientAsync(Models.Client client)
        {
            // Inserta o actualiza el registro en Supabase
            await _supabaseClient.From<Client>().Upsert(client);
        }
    }
}
