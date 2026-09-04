namespace FoodRescue.Api.DTOs.Pickups;

public class PickupDto
{
    public int Id { get; set; }
    public int DonationId { get; set; }
    public int OrganizationId { get; set; }
    public DateTime PickupDate { get; set; }
    public string PickupTime { get; set; } = string.Empty;
    public string PickupLocation { get; set; } = string.Empty;
    public string PersonResponsible { get; set; } = string.Empty;
    public string ContactNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
