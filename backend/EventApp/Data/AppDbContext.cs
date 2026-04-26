using EventApp.Models;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Event> Events { get; set; }
    public DbSet<Participant> Participants { get; set; }
}