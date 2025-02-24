using Microsoft.AspNetCore.Mvc;
using ContactCenterBackend.Models;
using ContactCenterBackend.DTOs;
using ContactCenterBackend.Services;

namespace ContactCenterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly AgentService _agentService;

        public AgentsController(AgentService agentService)
        {
            _agentService = agentService;
        }

        // Se agrega el parámetro opcional "status" vía query string
        [HttpGet]
        public async Task<IActionResult> GetAgents([FromQuery] string? status)
        {
            var agents = await _agentService.GetAllAgentsAsync();

            if (!string.IsNullOrEmpty(status))
            {
                agents = agents.Where(a => a.Status?.Equals(status, StringComparison.OrdinalIgnoreCase) == true);
            }

            var agentDtos = agents.Select(a => new AgentDto
            {
                Id = a.Id,
                Name = a.Name,
                Status = a.Status,
                WaitTime = a.WaitTime
            });

            return Ok(agentDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAgent([FromBody] Agent agent)
        {
            await _agentService.AddOrUpdateAgentAsync(agent);
            return Ok();
        }
    }
}
