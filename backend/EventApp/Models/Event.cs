namespace EventApp.Models;

public class Event
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Time { get; set; }
    public int MaxAttendees { get; set; }
    public List<Participant> Participants { get; set; } = new();
}