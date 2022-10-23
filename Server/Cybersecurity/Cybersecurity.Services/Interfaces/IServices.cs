namespace Cybersecurity.Services.Interfaces;

public interface IServices
{
    public Task<bool> LogIn(string userName, string password);
    public Task<bool> Register(string userName, string password);
}