using Microsoft.AspNetCore.Mvc;

namespace Cybersecurity.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public void GetLoggedUser()
    {
        
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