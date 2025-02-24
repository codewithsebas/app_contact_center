using Microsoft.AspNetCore.Mvc;
using ContactCenterBackend.Models;
using ContactCenterBackend.DTOs;
using ContactCenterBackend.Services;

namespace ContactCenterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientsController(ClientService clientService)
        {
            _clientService = clientService;
        }

        // Agrega el parámetro opcional "waitTime" vía query string
        [HttpGet]
        public async Task<IActionResult> GetClients([FromQuery] string? waitTime)
        {
            var clients = await _clientService.GetAllClientsAsync();

            if (!string.IsNullOrEmpty(waitTime))
            {
                if (waitTime.Equals("short", StringComparison.OrdinalIgnoreCase))
                {
                    clients = clients.Where(c => c.WaitTime < 60);
                }
                else if (waitTime.Equals("medium", StringComparison.OrdinalIgnoreCase))
                {
                    clients = clients.Where(c => c.WaitTime >= 60 && c.WaitTime <= 300);
                }
                else if (waitTime.Equals("long", StringComparison.OrdinalIgnoreCase))
                {
                    clients = clients.Where(c => c.WaitTime > 300);
                }
            }

            var clientDtos = clients.Select(c => new ClientDto
            {
                Id = c.Id,
                Name = c.Name,
                WaitTime = c.WaitTime
            });

            return Ok(clientDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateClient([FromBody] Client client)
        {
            await _clientService.AddOrUpdateClientAsync(client);
            return Ok();
        }
    }
}
