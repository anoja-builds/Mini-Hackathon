namespace FoodRescue.Api.Models;
public class Donation { public int Id { get; set; } public string FoodName { get; set; } = ""; public int Quantity { get; set; } public string District { get; set; } = ""; public string Location { get; set; } = ""; public DateTime ExpiryTime { get; set; } public DateTime PickupTime { get; set; } public string Status { get; set; } = "Available"; }
