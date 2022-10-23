using Database;
using Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Cybersecurity;

public static class DependencyInjection
{
    public static void AddDependencies(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(opt =>
            opt.UseSqlServer(connectionString, x => x.MigrationsAssembly("Cybersecurity.Database")));
        services.AddTransient<ISqlConnectionService, SqlConnectionService>(_ =>
            new SqlConnectionService(connectionString));
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    }
}