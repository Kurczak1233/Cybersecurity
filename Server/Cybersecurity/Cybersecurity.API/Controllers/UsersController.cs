using Cybersecurity.Services.Interfaces;
using Cybersecurity.Services.Models.DTOs;
using Cybersecurity.Services.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Cybersecurity.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IServices _services;

    public UsersController(IServices services)
    {
        _services = services;
    }

    [HttpGet("Users")]
    public async Task<ActionResult<List<AppUserVm>>> GetAllUsers()
    {
        // TODO This is a vulnerability, but I am not supposed to secure the whole app on this course.
        var allUsers = await _services.GetAllAppUsers();
        return Ok(allUsers);
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register([FromBody] UserCredentialsDto credentials)
    {
        await _services.Register(credentials.Username, credentials.Password, credentials.CreatedByAdmin);
        return Ok();
    }

    [HttpPost("Login")]
    public async Task<ActionResult<LoggedUserVm>> LogIn([FromBody] UserCredentialsDto credentials)
    {
        return Ok(await _services.LogIn(credentials.Username, credentials.Password));
    }

    [HttpPost("ChangePassword")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto request)
    {
        await _services.ChangeUserPassword(request);
        return Ok();
    }

    [HttpPost("ChangeUsername")]
    public async Task<ActionResult> ChangeUsername([FromBody] ChangeUsernameDto request)
    {
        await _services.ChangeUserUsername(request);
        return Ok();
    }


    [HttpPut("Block/{userId}")]
    public async Task<ActionResult> BlockUser(int userId)
    {
        await _services.BlockUser(userId);
        return Ok();
    }
    
    [HttpPut("Delete/{userId}")]
    public async Task<ActionResult> DeleteUser(int userId)
    {
        await _services.DeleteUser(userId);
        return Ok();
    }
    
    [HttpPut("ValidDate")]
    public async Task<ActionResult> ValidDate([FromBody] PasswordValidDateDTO request)
    {
        await _services.UpdatePasswordValidDate(request);
        return Ok();
    }
    
    
    // [HttpGet]
    // public void CreateUser()
    // {
    //     
    // }

    // [HttpGet]
    // public void DeleteUser()
    // {
    //     
    // }
}