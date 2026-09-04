using Microsoft.EntityFrameworkCore;
using FoodRescue.Api.Models;
namespace FoodRescue.Api.Data;
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
	public DbSet<Organization> Organizations => Set<Organization>();
}
