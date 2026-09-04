using Microsoft.AspNetCore.Mvc;
using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.Pickups;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodRescue.Api.Controllers;
[ApiController, Route("api/pickups")]
public class PickupsController(AppDbContext db) : ControllerBase
{
	[HttpGet] public async Task<ActionResult<List<Pickup>>> GetAll() => Ok(await db.Pickups.AsNoTracking().ToListAsync());
	[HttpGet("{id:int}")] public async Task<ActionResult<Pickup>> Get(int id) => await db.Pickups.FindAsync(id) is { } item ? Ok(item) : NotFound();
	[HttpPost] public async Task<ActionResult<Pickup>> Create(CreatePickupDto dto) { var item = new Pickup { DonationId=dto.DonationId, OrganizationId=dto.OrganizationId, PickupDate=dto.PickupDate, PickupTime=dto.PickupTime, PickupLocation=dto.PickupLocation, PersonResponsible=dto.PersonResponsible, ContactNumber=dto.ContactNumber, Status=dto.Status }; db.Pickups.Add(item); await db.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id=item.Id }, item); }
	[HttpPut("{id:int}")] public async Task<IActionResult> Update(int id, UpdatePickupDto dto) { var item = await db.Pickups.FindAsync(id); if (item is null) return NotFound(); item.DonationId=dto.DonationId; item.OrganizationId=dto.OrganizationId; item.PickupDate=dto.PickupDate; item.PickupTime=dto.PickupTime; item.PickupLocation=dto.PickupLocation; item.PersonResponsible=dto.PersonResponsible; item.ContactNumber=dto.ContactNumber; item.Status=dto.Status; await db.SaveChangesAsync(); return NoContent(); }
	[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id) { var item = await db.Pickups.FindAsync(id); if (item is null) return NotFound(); db.Pickups.Remove(item); await db.SaveChangesAsync(); return NoContent(); }
}
