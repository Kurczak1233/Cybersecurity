using Cybersecurity.Services.Interfaces;
using Database;
using Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cybersecurity.Services.Services;

public class Services : IServices
{
    private readonly ApplicationDbContext _context;
    
    public Services(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<bool> LogIn(string userName, string password)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Password == password && item.Username == userName);
        return foundUser != null;
    }

    public async Task<bool> Register(string userName, string password)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Username == userName);
        if (foundUser == null)
        {
            _context.Users.AddAsync(new()
            {
                Email = null,
                Password = password,
                Username = userName,
                IsBlocked = false,
                IsDeleted = false,
                FirstTimeLogin = false,
                PasswordValidityTime = default,
                UserRoleId = 1,
            });
            await _context.SaveChangesAsync();
        }

        throw new ArgumentException("User already exits", userName);
    }
}