using EventApp.Data;
using EventApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminController(AppDbContext db)
    {
        _db = db;
    }

    [HttpDelete("reset")]
    [Authorize]
    public async Task<IActionResult> ResetDatabase()
    {
        await _db.Participants.ExecuteDeleteAsync();
        await _db.Events.ExecuteDeleteAsync();
        return Ok(new { message = "Database cleared." });
    }
}