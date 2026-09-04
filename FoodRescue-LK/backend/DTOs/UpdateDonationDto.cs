using System.ComponentModel.DataAnnotations;

namespace FoodRescue.Api.DTOs;

public class UpdateDonationDto
{
    [Required, StringLength(100)]
    public string FoodType { get; set; } = string.Empty;

    [Range(1, 100000)]
    public int Quantity { get; set; }

    [Required, StringLength(30)]
    public string Unit { get; set; } = "portions";

    [Required, StringLength(100)]
    public string District { get; set; } = string.Empty;

    [Required, StringLength(200)]
    public string Location { get; set; } = string.Empty;

    public DateTime ExpiryTime { get; set; }
    public DateTime PickupTime { get; set; }

    [Required, StringLength(150)]
    public string ContactInfo { get; set; } = string.Empty;

    [Required, StringLength(30)]
    public string Status { get; set; } = "Available";
}
