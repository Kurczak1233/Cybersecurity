namespace Cybersecurity.Services.Models.DTOs;

public class UserCredentialsDto
{
    public string Password { get; set; }
    public string Username { get; set; }
    public bool CreatedByAdmin { get; set; }
    public bool PasswordWasGenerated { get; set; }
}