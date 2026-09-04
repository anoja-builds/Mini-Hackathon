using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.FoodRequests
{
    public class CreateFoodRequestDto
    {
        [Required]
        public string FoodType { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int RequiredQuantity { get; set; }

        [Required]
        public string District { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public DateTime RequiredDate { get; set; }

        [Required]
        public string ContactInformation { get; set; } = string.Empty;

        public string Reason { get; set; } = string.Empty;
    }
}