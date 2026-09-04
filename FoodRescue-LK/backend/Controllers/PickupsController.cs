using System.ComponentModel.DataAnnotations;
using FoodRescue.Api.DTOs.Pickups;
using FoodRescue.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodRescue.Api.Controllers;

[ApiController, Route("api/pickups")]
public class PickupsController : ControllerBase
{
    private static readonly List<Pickup> Pickups =
    [
        new Pickup
        {
            Id = 1,
            DonationId = 1,
            OrganizationId = 1,
            PickupDate = new DateTime(2026, 9, 5),
            PickupTime = "18:00",
            PickupLocation = "Colombo",
            PersonResponsible = "Nimal Perera",
            ContactNumber = "0771234567",
            Status = "Scheduled"
        },
        new Pickup
        {
            Id = 2,
            DonationId = 2,
            OrganizationId = 1,
            PickupDate = new DateTime(2026, 9, 6),
            PickupTime = "10:30",
            PickupLocation = "Dehiwala",
            PersonResponsible = "Kumari Silva",
            ContactNumber = "0712345678",
            Status = "Pending"
        },
        new Pickup
        {
            Id = 3,
            DonationId = 3,
            OrganizationId = 2,
            PickupDate = new DateTime(2026, 9, 4),
            PickupTime = "14:00",
            PickupLocation = "Kandy",
            PersonResponsible = "Saman Jayasinghe",
            ContactNumber = "0763456789",
            Status = "Collected"
        }
    ];

    [HttpPost]
    public ActionResult<PickupDto> CreatePickup(CreatePickupDto dto)
    {
        var pickup = new Pickup
        {
            Id = Pickups.Count == 0 ? 1 : Pickups.Max(p => p.Id) + 1,
            DonationId = dto.DonationId,
            OrganizationId = dto.OrganizationId,
            PickupDate = dto.PickupDate!.Value,
            PickupTime = dto.PickupTime,
            PickupLocation = dto.PickupLocation,
            PersonResponsible = dto.PersonResponsible,
            ContactNumber = dto.ContactNumber,
            Status = dto.Status
        };

        Pickups.Add(pickup);
        var result = ToDto(pickup);

        return CreatedAtAction(nameof(GetPickup), new { id = pickup.Id }, result);
    }

    [HttpGet]
    public ActionResult<IEnumerable<PickupDto>> GetPickups()
    {
        return Ok(Pickups.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public ActionResult<PickupDto> GetPickup(int id)
    {
        var pickup = Pickups.FirstOrDefault(p => p.Id == id);
        return pickup is null ? NotFound() : Ok(ToDto(pickup));
    }

    [HttpPut("{id:int}")]
    public ActionResult<PickupDto> UpdatePickup(int id, UpdatePickupDto dto)
    {
        var pickup = Pickups.FirstOrDefault(p => p.Id == id);
        if (pickup is null)
        {
            return NotFound();
        }

        pickup.DonationId = dto.DonationId;
        pickup.OrganizationId = dto.OrganizationId;
        pickup.PickupDate = dto.PickupDate!.Value;
        pickup.PickupTime = dto.PickupTime;
        pickup.PickupLocation = dto.PickupLocation;
        pickup.PersonResponsible = dto.PersonResponsible;
        pickup.ContactNumber = dto.ContactNumber;
        pickup.Status = dto.Status;

        return Ok(ToDto(pickup));
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeletePickup(int id)
    {
        var pickup = Pickups.FirstOrDefault(p => p.Id == id);
        if (pickup is null)
        {
            return NotFound();
        }

        Pickups.Remove(pickup);
        return NoContent();
    }

    [HttpPatch("{id:int}/status")]
    public ActionResult<PickupDto> UpdateStatus(int id, UpdatePickupStatusDto dto)
    {
        var pickup = Pickups.FirstOrDefault(p => p.Id == id);
        if (pickup is null)
        {
            return NotFound();
        }

        pickup.Status = dto.Status;
        return Ok(ToDto(pickup));
    }

    private static PickupDto ToDto(Pickup pickup)
    {
        return new PickupDto
        {
            Id = pickup.Id,
            DonationId = pickup.DonationId,
            OrganizationId = pickup.OrganizationId,
            PickupDate = pickup.PickupDate,
            PickupTime = pickup.PickupTime,
            PickupLocation = pickup.PickupLocation,
            PersonResponsible = pickup.PersonResponsible,
            ContactNumber = pickup.ContactNumber,
            Status = pickup.Status
        };
    }
}

public class UpdatePickupStatusDto
{
    [Required]
    [RegularExpression("^(Pending|Scheduled|Collected|Cancelled)$",
        ErrorMessage = "Status must be Pending, Scheduled, Collected, or Cancelled.")]
    public string Status { get; set; } = string.Empty;
}
