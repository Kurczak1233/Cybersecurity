using Cybersecurity.Services.Models.DTOs;
using Cybersecurity.Services.Models.ViewModels;

namespace Cybersecurity.Services.Interfaces;

public interface IServices
{
    public Task<LoggedUserVm> LogIn(string userName, string password);
    public Task Register(string userName, string password, bool createdByAdmin);
    public Task ChangeUserPassword(ChangePasswordDto request);
    public Task ChangeUserUsername(ChangeUsernameDto request);
    public Task<List<AppUserVm>> GetAllAppUsers();
    public Task BlockUser(int userId);
    public Task DeleteUser(int userId);
    public Task UpdatePasswordValidDate(PasswordValidDateDTO request);
}