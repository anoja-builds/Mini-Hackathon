using System.ComponentModel.DataAnnotations;

namespace FoodRescue.Api.DTOs.Pickups;

public class UpdatePickupDto
{
    [Range(1, int.MaxValue, ErrorMessage = "DonationId must be greater than 0.")]
    public int DonationId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "OrganizationId must be greater than 0.")]
    public int OrganizationId { get; set; }

    [Required]
    public DateTime? PickupDate { get; set; }

    [Required]
    public string PickupTime { get; set; } = string.Empty;

    [Required]
    public string PickupLocation { get; set; } = string.Empty;

    [Required]
    public string PersonResponsible { get; set; } = string.Empty;

    [Required]
    public string ContactNumber { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(Pending|Scheduled|Collected|Cancelled)$",
        ErrorMessage = "Status must be Pending, Scheduled, Collected, or Cancelled.")]
    public string Status { get; set; } = string.Empty;
}
