namespace Cybersecurity.Services.Models.DTOs;

public class PasswordValidDateDTO
{
    public int UserId { get; set; }
    public DateTimeOffset Date { get; set; }
}