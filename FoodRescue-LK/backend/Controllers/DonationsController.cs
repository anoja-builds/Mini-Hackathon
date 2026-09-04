using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs;
using FoodRescue.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Controllers;

[ApiController]
[Route("api/donations")]
public class DonationsController(AppDbContext context) : ControllerBase
{
    // GET /api/donations?search={term}
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DonationDto>>> GetAll([FromQuery] string? search)
    {
        var query = context.Donations.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(d =>
                d.FoodType.ToLower().Contains(term) ||
                d.District.ToLower().Contains(term) ||
                d.Location.ToLower().Contains(term) ||
                d.Status.ToLower().Contains(term));
        }

        var donations = await query.OrderByDescending(d => d.CreatedAt).ToListAsync();
        return Ok(donations.Select(ToDto));
    }

    // GET /api/donations/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<DonationDto>> GetById(int id)
    {
        var donation = await context.Donations.FindAsync(id);
        if (donation is null)
        {
            return NotFound(new { message = $"Donation with ID {id} was not found." });
        }

        return Ok(ToDto(donation));
    }

    // POST /api/donations
    [HttpPost]
    public async Task<ActionResult<DonationDto>> Create([FromBody] CreateDonationDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var donation = FromDto(dto);
        context.Donations.Add(donation);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = donation.Id }, ToDto(donation));
    }

    // PUT /api/donations/{id}
    [HttpPut("{id:int}")]
    public async Task<ActionResult<DonationDto>> Update(int id, [FromBody] UpdateDonationDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var donation = await context.Donations.FindAsync(id);
        if (donation is null)
        {
            return NotFound(new { message = $"Donation with ID {id} was not found." });
        }

        Copy(dto, donation);
        await context.SaveChangesAsync();

        return Ok(ToDto(donation));
    }

    // DELETE /api/donations/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var donation = await context.Donations.FindAsync(id);
        if (donation is null)
        {
            return NotFound(new { message = $"Donation with ID {id} was not found." });
        }

        context.Donations.Remove(donation);
        await context.SaveChangesAsync();

        return NoContent();
    }

    private static Donation FromDto(CreateDonationDto dto) => new()
    {
        FoodType = dto.FoodType.Trim(),
        Quantity = dto.Quantity,
        Unit = dto.Unit.Trim(),
        District = dto.District.Trim(),
        Location = dto.Location.Trim(),
        ExpiryTime = dto.ExpiryTime,
        PickupTime = dto.PickupTime,
        ContactInfo = dto.ContactInfo.Trim(),
        Status = string.IsNullOrWhiteSpace(dto.Status) ? "Available" : dto.Status.Trim()
    };

    private static void Copy(UpdateDonationDto dto, Donation d)
    {
        d.FoodType = dto.FoodType.Trim();
        d.Quantity = dto.Quantity;
        d.Unit = dto.Unit.Trim();
        d.District = dto.District.Trim();
        d.Location = dto.Location.Trim();
        d.ExpiryTime = dto.ExpiryTime;
        d.PickupTime = dto.PickupTime;
        d.ContactInfo = dto.ContactInfo.Trim();
        d.Status = string.IsNullOrWhiteSpace(dto.Status) ? "Available" : dto.Status.Trim();
    }

    private static DonationDto ToDto(Donation d) => new()
    {
        Id = d.Id,
        FoodType = d.FoodType,
        Quantity = d.Quantity,
        Unit = d.Unit,
        District = d.District,
        Location = d.Location,
        ExpiryTime = d.ExpiryTime,
        PickupTime = d.PickupTime,
        ContactInfo = d.ContactInfo,
        Status = d.Status,
        CreatedAt = d.CreatedAt
    };
}
