namespace Cybersecurity.Services.Models.ViewModels;

public class AppUserVm
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public bool IsBlocked { get; set; }
    public DateTimeOffset PasswordValidDate { get; set; }
}