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
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "Event name is required." });

        if (request.Time == default)
            return BadRequest(new { message = "Event time is required." });

        if (request.Time < DateTime.UtcNow)
            return BadRequest(new { message = "Event time must be in the future." });

        if (request.MaxAttendees <= 0)
            return BadRequest(new { message = "Max attendees must be a positive number." });
        
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

    [HttpDelete("delete/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var ev = await _db.Events
            .Include(e => e.Participants)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (ev == null)
            return NotFound(new { message = "Event not found" });

        _db.Participants.RemoveRange(ev.Participants);
        _db.Events.Remove(ev);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Event deleted." });
    }
}