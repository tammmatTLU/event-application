using EventApp.Data;
using EventApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _db;

    public EventsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents()
    {
        var events = await _db.Events
            .Include(e => e.Participants)
            .ToListAsync();

        return Ok(events.Select(e => new
        {
            e.Id,
            e.Name,
            e.Time,
            e.MaxAttendees,
            ParticipantCount = e.Participants.Count
        }));
    }

    public record CreateEventRequest(string Name, DateTime Time, int MaxAttendees);

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
    {
        var ev = new Event
        {
            Name = request.Name,
            Time = request.Time,
            MaxAttendees = request.MaxAttendees
        };

        _db.Events.Add(ev);
        await _db.SaveChangesAsync();

        return Ok(ev);
    }
}