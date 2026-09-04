using Microsoft.AspNetCore.Mvc;
using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.Donations;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodRescue.Api.Controllers;
[ApiController, Route("api/donations")]
public class DonationsController(AppDbContext db) : ControllerBase
{
	[HttpGet] public async Task<ActionResult<List<Donation>>> GetAll() => Ok(await db.Donations.AsNoTracking().ToListAsync());
	[HttpGet("{id:int}")] public async Task<ActionResult<Donation>> Get(int id) => await db.Donations.FindAsync(id) is { } item ? Ok(item) : NotFound();
	[HttpPost] public async Task<ActionResult<Donation>> Create(CreateDonationDto dto) { var item = new Donation { FoodName=dto.FoodName, Quantity=dto.Quantity, District=dto.District, Location=dto.Location, ExpiryTime=dto.ExpiryTime, PickupTime=dto.PickupTime, Status=dto.Status }; db.Donations.Add(item); await db.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id=item.Id }, item); }
	[HttpPut("{id:int}")] public async Task<IActionResult> Update(int id, UpdateDonationDto dto) { var item = await db.Donations.FindAsync(id); if (item is null) return NotFound(); item.FoodName=dto.FoodName; item.Quantity=dto.Quantity; item.District=dto.District; item.Location=dto.Location; item.ExpiryTime=dto.ExpiryTime; item.PickupTime=dto.PickupTime; item.Status=dto.Status; await db.SaveChangesAsync(); return NoContent(); }
	[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id) { var item = await db.Donations.FindAsync(id); if (item is null) return NotFound(); db.Donations.Remove(item); await db.SaveChangesAsync(); return NoContent(); }
}
