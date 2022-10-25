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
    
    [HttpPost("Register")]
    public async Task<ActionResult> Register([FromBody] UserCredentialsDto credentials)
    {
        await _services.Register(credentials.Username, credentials.Password);
        return Ok();
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<LoggedUserVm>> LogIn([FromBody] UserCredentialsDto credentials)
    {
        return Ok(await _services.LogIn(credentials.Username, credentials.Password));
    }
    
    [HttpPost("ChangePassword")]
    public async Task<ActionResult<LoggedUserVm>> ChangePassword([FromBody] ChangePasswordDto request)
    {
        await _services.ChangeUserPassword(request);
        return Ok();
    }
    // [HttpGet]
    // public void GetAllUsers()
    // {
    //     
    // }
    // [HttpGet]
    // public void BlockUser()
    // {
    //     
    // }
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