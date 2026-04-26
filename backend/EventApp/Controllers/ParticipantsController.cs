using EventApp.Data;
using EventApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParticipantsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ParticipantsController(AppDbContext db)
    {
        _db = db;
    }

    public record RegisterRequest(string FirstName, string LastName, string NationalId, int EventId);

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var ev = await _db.Events
            .Include(e => e.Participants)
            .FirstOrDefaultAsync(e => e.Id == request.EventId);

        if (ev == null)
            return NotFound(new { message = "Event not found" });

        if (ev.Participants.Count >= ev.MaxAttendees)
            return BadRequest(new { message = "Event is full" });

        var participant = new Participant
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            NationalId = request.NationalId,
            EventId = request.EventId
        };

        _db.Participants.Add(participant);
        await _db.SaveChangesAsync();

        return Ok(new {
            participant.Id,
            participant.FirstName,
            participant.LastName,
            participant.NationalId,
            participant.EventId
        });
    }
}