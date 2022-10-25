namespace Cybersecurity.Services.Models.DTOs;

public class ChangePasswordDto
{
    public int UserId { get; set; }
    public string NewPassword { get; set; } = null!;
    public string OldPassword { get; set; } = null!;
}