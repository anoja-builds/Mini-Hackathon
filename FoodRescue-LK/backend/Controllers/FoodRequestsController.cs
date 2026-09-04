using Microsoft.AspNetCore.Mvc;
using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.FoodRequests;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodRescue.Api.Controllers;
[ApiController, Route("api/foodrequests")]
public class FoodRequestsController(AppDbContext db) : ControllerBase
{
	[HttpGet] public async Task<ActionResult<List<FoodRequest>>> GetAll() => Ok(await db.FoodRequests.AsNoTracking().ToListAsync());
	[HttpGet("{id:int}")] public async Task<ActionResult<FoodRequest>> Get(int id) => await db.FoodRequests.FindAsync(id) is { } item ? Ok(item) : NotFound();
	[HttpPost] public async Task<ActionResult<FoodRequest>> Create(CreateFoodRequestDto dto) { var item = new FoodRequest { FoodType=dto.FoodType, RequiredQuantity=dto.RequiredQuantity, District=dto.District, Location=dto.Location, RequiredDate=dto.RequiredDate, ContactInformation=dto.ContactInformation, Reason=dto.Reason, Status=dto.Status }; db.FoodRequests.Add(item); await db.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id=item.Id }, item); }
	[HttpPut("{id:int}")] public async Task<IActionResult> Update(int id, UpdateFoodRequestDto dto) { var item = await db.FoodRequests.FindAsync(id); if (item is null) return NotFound(); item.FoodType=dto.FoodType; item.RequiredQuantity=dto.RequiredQuantity; item.District=dto.District; item.Location=dto.Location; item.RequiredDate=dto.RequiredDate; item.ContactInformation=dto.ContactInformation; item.Reason=dto.Reason; item.Status=dto.Status; await db.SaveChangesAsync(); return NoContent(); }
	[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id) { var item = await db.FoodRequests.FindAsync(id); if (item is null) return NotFound(); db.FoodRequests.Remove(item); await db.SaveChangesAsync(); return NoContent(); }
}
