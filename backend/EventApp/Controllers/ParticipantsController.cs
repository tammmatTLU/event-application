using EventApp.Data;
using EventApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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

    // POST new participant to an event
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName))
            return BadRequest(new { message = "First name is required." });

        if (string.IsNullOrWhiteSpace(request.LastName))
            return BadRequest(new { message = "Last name is required." });

        if (string.IsNullOrWhiteSpace(request.NationalId))
            return BadRequest(new { message = "National ID is required." });
        
        if (!request.FirstName.All(char.IsLetter))
            return BadRequest(new { message = "First name must contain only letters." });

        if (!request.LastName.All(char.IsLetter))
            return BadRequest(new { message = "Last name must contain only letters." });

        if (!request.NationalId.All(char.IsDigit))
            return BadRequest(new { message = "National ID must contain only numbers." });

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

    // GET participants by eventId
    [HttpGet("event/{eventId}")]
    [Authorize]
    public async Task<IActionResult> GetParticipants(int eventId)
    {
        var participants = await _db.Participants
            .Where(p => p.EventId == eventId)
            .Select(p => new {
                p.Id,
                p.FirstName,
                p.LastName,
                p.NationalId
            })
            .ToListAsync();

        return Ok(participants);
    }

    // DELETE participant from specific event
    [HttpDelete("delete/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteParticipant(int id)
    {
        var participant = await _db.Participants.FindAsync(id);

        if (participant == null)
            return NotFound(new { message = "Participant not found" });

        _db.Participants.Remove(participant);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Participant deleted." });
    }
}