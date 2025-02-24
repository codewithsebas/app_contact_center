using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using ContactCenterBackend.Models;
using ContactCenterBackend.Services;

namespace ContactCenterBackend.WebSocket
{
    public class WebSocketHandler
    {
        private readonly AgentService _agentService;
        private readonly ClientService _clientService;
        private readonly List<System.Net.WebSockets.WebSocket> _sockets = new();

        public WebSocketHandler(AgentService agentService, ClientService clientService)
        {
            _agentService = agentService;
            _clientService = clientService;
        }

        public async Task HandleWebSocket(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                var socket = await context.WebSockets.AcceptWebSocketAsync();
                _sockets.Add(socket);

                while (socket.State == WebSocketState.Open)
                {
                    var buffer = new byte[1024];
                    var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        Console.WriteLine($"Received: {message}");
                    }
                }

                _sockets.Remove(socket);
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }

        public async Task BroadcastUpdate(string type, object data)
        {
            var json = JsonSerializer.Serialize(new { type, data });
            var buffer = Encoding.UTF8.GetBytes(json);

            foreach (var socket in _sockets.ToList())
            {
                if (socket.State == WebSocketState.Open)
                {
                    await socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }
}