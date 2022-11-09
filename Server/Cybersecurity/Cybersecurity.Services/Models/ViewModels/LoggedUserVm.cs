namespace Cybersecurity.Services.Models.ViewModels;

public class LoggedUserVm
{
    public bool IsAdmin { get; set; }
    public bool Logged { get; set; }
    public int UserId { get; set; }
    public string OneTimePassword { get; set; }
    public bool ShouldChangePassword { get; set; }
}