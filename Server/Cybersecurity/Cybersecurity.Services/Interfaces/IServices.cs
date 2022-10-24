using Cybersecurity.Services.Models.ViewModels;

namespace Cybersecurity.Services.Interfaces;

public interface IServices
{
    public Task<LoggedUserVm> LogIn(string userName, string password);
    public Task Register(string userName, string password);
}