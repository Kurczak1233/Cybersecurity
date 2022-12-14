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
        if (foundUser is { } && foundUser.OneTimePassword != "" && !foundUser.FirstTimeLogin)
        {
            //Not possible to ever loggin again
            throw new ArgumentException("You have not changed your one time password", userName);
        }

        if (foundUser is { IsBlocked: false, IsDeleted: false } && BC.Verify(password, foundUser.Password))
        {
            var firstTimeLogin = foundUser.FirstTimeLogin;
            foundUser.FirstTimeLogin = false;
            foundUser.LastSuccessfulLoggedIn = DateTimeOffset.Now;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();

            return new()
            {
                Logged = true, IsAdmin = foundUser.UserRoleId == (int)UserRolesEnum.Admin, UserId = foundUser.Id,
                OneTimePassword = foundUser.OneTimePassword,
                ShouldChangePassword = (foundUser.PasswordValidityTime < DateTimeOffset.Now &&
                                        foundUser.PasswordValidityTime.Year > 2000) ||
                                       (foundUser.CreatedByAdmin && firstTimeLogin)
            };
        }

        if (foundUser != null)
        {
            foundUser.LastUnsuccessfulLoggedIn = DateTimeOffset.Now;
            foundUser.FailedLoginsAttempts += 1;
            if (foundUser.FailedLoginsAttempts >= 5 || foundUser.NewPossibleLoginAttempt > DateTimeOffset.Now)
            {
                foundUser.FailedLoginsAttempts = 0;
                foundUser.NewPossibleLoginAttempt = DateTimeOffset.Now.AddMinutes(15);
                throw new ArgumentException("Wait 15 min to log in", userName);
            }
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            throw new ArgumentException("Failed to log in", userName);
        }

        throw new ArgumentException("User was not found", userName);
    }

    public async Task Register(string userName, string password, bool createdByAdmin, bool passwordWasGenerated)
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
                FirstTimeLogin = true,
                PasswordValidityTime = default,
                Created = DateTimeOffset.Now,
                UserRoleId = (int)UserRolesEnum.User,
                CreatedByAdmin = createdByAdmin,
                OneTimePassword = passwordWasGenerated ? password : "",
            });
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("User already exits", userName);
    }

    public async Task ChangeUserPassword(ChangePasswordDto request)
    {
        var foundUser = await _context.Users.SingleOrDefaultAsync((item) =>
            item.Id == request.UserId);
        if (foundUser != null && BC.Verify(request.OldPassword, foundUser.Password))
        {
            foundUser.Password = BC.HashPassword(request.NewPassword);
            foundUser.OneTimePassword = "";
            foundUser.LastPasswordChange = DateTimeOffset.Now;

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
            foundUser.LastUsernameChange = DateTimeOffset.Now;
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
            foundUser.UserBlockedOn = DateTimeOffset.Now;
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
            foundUser.UserDeletedOn = DateTimeOffset.Now;
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
            foundUser.PasswordValidityTimeUpdatedOn = DateTimeOffset.Now;
            _context.Users.Attach(foundUser);
            await _context.SaveChangesAsync();
            return;
        }

        throw new ArgumentException("Updating password validity failed");
    }
}