namespace EventApp.DTOs;

public record CreateEventRequest(string Name, DateTime Time, int MaxAttendees);

public record EventResponse(
    int Id,
    string Name,
    DateTime Time,
    int MaxAttendees,
    int ParticipantCount
);