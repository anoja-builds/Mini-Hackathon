namespace FoodRescue.Api.DTOs.FoodRequests
{
    public class FoodRequestDto
    {
        public int Id { get; set; }
        public string FoodType { get; set; } = string.Empty;
        public int RequiredQuantity { get; set; }
        public string District { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime RequiredDate { get; set; }
        public string ContactInformation { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
