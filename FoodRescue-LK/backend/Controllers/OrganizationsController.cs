using Microsoft.AspNetCore.Mvc;
using FoodRescue.Api.DTOs.Organizations;
using FoodRescue.Api.Services;
namespace FoodRescue.Api.Controllers;
[ApiController, Route("api/organizations")]
public class OrganizationsController(OrganizationService service) : ControllerBase
{
	[HttpGet] public async Task<ActionResult<List<OrganizationDto>>> GetAll([FromQuery] string? district, [FromQuery] string? type) => Ok(await service.GetAll(district, type));
	[HttpGet("{id:int}")] public async Task<ActionResult<OrganizationDto>> Get(int id) => await service.Get(id) is { } item ? Ok(item) : NotFound();
	[HttpPost] public async Task<ActionResult<OrganizationDto>> Create(CreateOrganizationDto dto) { var item = await service.Create(dto); return CreatedAtAction(nameof(Get), new { id = item.Id }, item); }
	[HttpPut("{id:int}")] public async Task<IActionResult> Update(int id, UpdateOrganizationDto dto) => await service.Update(id, dto) ? NoContent() : NotFound();
	[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id) => await service.Delete(id) ? NoContent() : NotFound();
}
