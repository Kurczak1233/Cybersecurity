namespace Database.Entities;

public class User : BaseEntity
{
    public string Password { get; set; }
    public string Username { get; set; }
    public bool IsBlocked { get; set; }
    public bool CreatedByAdmin { get; set; }
    public bool IsDeleted { get; set; } = false;
    public bool FirstTimeLogin { get; set; }
    public string OneTimePassword { get; set; }
    public int FailedLoginsAttempts { get; set; }
    public DateTimeOffset NewPossibleLoginAttempt { get; set; }
    public DateTimeOffset PasswordValidityTime { get; set; }
    public DateTimeOffset Created { get; set; }
    public DateTimeOffset LastPasswordChange { get; set; }
    public DateTimeOffset LastUsernameChange { get; set; }
    public DateTimeOffset UserBlockedOn { get; set; }
    public DateTimeOffset UserDeletedOn { get; set; }
    public DateTimeOffset PasswordValidityTimeUpdatedOn { get; set; }
    public DateTimeOffset LastSuccessfulLoggedIn { get; set; }
    public DateTimeOffset LastUnsuccessfulLoggedIn { get; set; }
    public int UserRoleId { get; set; }
    public UserRole UserRole { get; set; }
}