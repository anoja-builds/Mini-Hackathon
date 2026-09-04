using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
	public DbSet<FoodRequest> FoodRequests => Set<FoodRequest>();
	public DbSet<Organization> Organizations => Set<Organization>();
	public DbSet<Donation> Donations => Set<Donation>();
	public DbSet<Pickup> Pickups => Set<Pickup>();
}
