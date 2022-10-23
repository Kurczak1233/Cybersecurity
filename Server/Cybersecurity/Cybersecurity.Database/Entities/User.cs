namespace Database.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } 
    public string Password { get; set; }
    public string Username { get; set; }
    public bool IsBlocked { get; set; }
    public bool IsDeleted { get; set; } = false;
    public bool FirstTimeLogin { get; set; }
    public DateTimeOffset PasswordValidityTime { get; set; }
}