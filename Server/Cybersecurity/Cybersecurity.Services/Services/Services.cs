using Cybersecurity.Services.Interfaces;
using Cybersecurity.Services.Models.Enums;
using Cybersecurity.Services.Models.ViewModels;
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
    public async Task<LoggedUserVm> LogIn(string userName, string password)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Password == password && item.Username == userName);
        return new() { Logged = foundUser != null, IsAdmin = (int)foundUser.UserRoleId == (int)UserRolesEnum.Admin };
    }

    public async Task Register(string userName, string password)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Username == userName);
        if (foundUser == null)
        {
            _context.Users.AddAsync(new()
            {
                Password = password,
                Username = userName,
                IsBlocked = false,
                IsDeleted = false,
                FirstTimeLogin = false,
                PasswordValidityTime = default,
                UserRoleId = (int)UserRolesEnum.User,
            });
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("User already exits", userName);
    }
}