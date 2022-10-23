using Cybersecurity.Services.Interfaces;

namespace Cybersecurity;

public static class RegisterDependencies
{
    public static void AddDependencies(this IServiceCollection services)
    {
        services.AddScoped<IServices, Services.Services.Services>();
    }
}