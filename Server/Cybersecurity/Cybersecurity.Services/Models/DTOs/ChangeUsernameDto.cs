namespace Cybersecurity.Services.Models.DTOs;

public class ChangeUsernameDto
{
    public int UserId { get; set; }
    public string NewUsername { get; set; } = null!;
}