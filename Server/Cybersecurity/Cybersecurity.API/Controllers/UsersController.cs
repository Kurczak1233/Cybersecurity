using Cybersecurity.Services.Interfaces;
using Cybersecurity.Services.Models.DTOs;
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
        return Ok(await _services.Register(credentials.Username, credentials.Password));
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult> LogIn([FromBody] UserCredentialsDto credentials)
    {
        return Ok(await _services.LogIn(credentials.Username, credentials.Password));
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
    // public void ChangePassword()
    // {
    //     
    // }
    // [HttpGet]
    // public void DeleteUser()
    // {
    //     
    // }
}