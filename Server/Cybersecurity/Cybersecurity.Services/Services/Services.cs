using Cybersecurity.Services.Interfaces;
using Cybersecurity.Services.Models.DTOs;
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
        if (foundUser != null)
        {
            return new() { Logged = true, IsAdmin = foundUser.UserRoleId == (int)UserRolesEnum.Admin, UserId = foundUser.Id };
        }

        throw new ArgumentException("User was not found", userName);
    }

    public async Task Register(string userName, string password)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Username == userName);
        if (foundUser == null)
        {
            await _context.Users.AddAsync(new()
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

    public async Task ChangeUserPassword(ChangePasswordDto request)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Password == request.OldPassword && item.Id == request.UserId);
        if (foundUser != null)
        {
            foundUser.Password = request.NewPassword;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }
        
        throw new ArgumentException("Changing passwords failed");
    }
}