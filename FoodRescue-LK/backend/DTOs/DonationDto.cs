namespace FoodRescue.Api.DTOs;

public class DonationDto
{
    public int Id { get; set; }
    public string FoodType { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime ExpiryTime { get; set; }
    public DateTime PickupTime { get; set; }
    public string ContactInfo { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
