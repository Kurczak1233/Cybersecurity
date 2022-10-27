using Cybersecurity.Services.Interfaces;
using Cybersecurity.Services.Models.DTOs;
using Cybersecurity.Services.Models.Enums;
using Cybersecurity.Services.Models.ViewModels;
using Database;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

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
        var foundUser =
            await _context.Users.SingleOrDefaultAsync((item) => item.Username == userName);
        if (foundUser is { IsBlocked: false, IsDeleted: false } && BC.Verify(password, foundUser.Password))
        {
            var firstTimeLogin = foundUser.FirstTimeLogin;
            foundUser.FirstTimeLogin = false;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();

            return new()
            {
                Logged = true, IsAdmin = foundUser.UserRoleId == (int)UserRolesEnum.Admin, UserId = foundUser.Id,
                ShouldChangePassword = (foundUser.PasswordValidityTime < DateTimeOffset.Now && foundUser.PasswordValidityTime.Year > 2000) ||
                                       (foundUser.CreatedByAdmin && firstTimeLogin)
            };
        }

        throw new ArgumentException("User was not found", userName);
    }

    public async Task Register(string userName, string password, bool createdByAdmin)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) => item.Username == userName);
        if (foundUser == null)
        {
            await _context.Users.AddAsync(new()
            {
                Password = BC.HashPassword(password),
                Username = userName,
                IsBlocked = false,
                IsDeleted = false,
                FirstTimeLogin = false,
                PasswordValidityTime = default,
                UserRoleId = (int)UserRolesEnum.User,
                CreatedByAdmin = createdByAdmin
            });
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("User already exits", userName);
    }

    public async Task ChangeUserPassword(ChangePasswordDto request)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) =>
            item.Password == request.OldPassword && item.Id == request.UserId);
        if (foundUser != null)
        {
            foundUser.Password = request.NewPassword;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Changing passwords failed");
    }

    public async Task ChangeUserUsername(ChangeUsernameDto request)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync(item => item.Id == request.UserId);
        if (foundUser != null)
        {
            foundUser.Username = request.NewUsername;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Changing username failed");
    }

    public async Task<List<AppUserVm>> GetAllAppUsers()
    {
        return await _context.Users.Where((item) => item.IsDeleted == false && item.UserRoleId == 2)
            .Select(item => new AppUserVm()
            {
                UserId = item.Id, IsBlocked = item.IsBlocked, Username = item.Username,
                PasswordValidDate = item.PasswordValidityTime
            })
            .ToListAsync();
    }

    public async Task BlockUser(int userId)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync(item => item.Id == userId);
        if (foundUser != null)
        {
            foundUser.IsBlocked = true;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Blocking user failed");
    }

    public async Task DeleteUser(int userId)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync(item => item.Id == userId);
        if (foundUser != null)
        {
            foundUser.IsDeleted = true;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Deleting user failed");
    }

    public async Task UpdatePasswordValidDate(PasswordValidDateDTO request)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync(item => item.Id == request.UserId);
        if (foundUser != null)
        {
            foundUser.PasswordValidityTime = request.Date;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Updating password validity failed");
    }
}