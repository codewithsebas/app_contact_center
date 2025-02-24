using ContactCenterBackend.Services;
using ContactCenterBackend.WebSocket;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// Habilitar CORS: Se debe agregar antes de construir la aplicación
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configura la conexión a Supabase
string supabaseUrl = "https://xhyihmqgbpjgflpffcqi.supabase.co";
string supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoeWlobXFnYnBqZ2ZscGZmY3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMjc5MzEsImV4cCI6MjA1NTkwMzkzMX0.ErXDV8RrJEsswJauybcrIK7KZwVZD8cfoJRUGQMs3Ao";

builder.Services.AddSingleton<Client>(serviceProvider =>
{
    var client = new Client(supabaseUrl, supabaseKey);
    // Inicializa la conexión de forma sincrónica
    client.InitializeAsync().Wait();
    return client;
});

// Registra tus servicios
builder.Services.AddSingleton<AgentService>();
builder.Services.AddSingleton<ClientService>();
builder.Services.AddSingleton<WebSocketHandler>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseWebSockets();
app.Map("/ws", async (HttpContext context, WebSocketHandler handler) =>
{
    await handler.HandleWebSocket(context);
});

app.MapControllers();
app.Run();
