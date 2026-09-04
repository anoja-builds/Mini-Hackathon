using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<FoodRequest> FoodRequests { get; set; } = null!;
}