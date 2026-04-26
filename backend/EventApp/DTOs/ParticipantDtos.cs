namespace EventApp.DTOs;

public record RegisterParticipantRequest(
    string FirstName,
    string LastName,
    string NationalId,
    int EventId
);

public record ParticipantResponse(
    int Id,
    string FirstName,
    string LastName,
    string NationalId,
    int EventId
);