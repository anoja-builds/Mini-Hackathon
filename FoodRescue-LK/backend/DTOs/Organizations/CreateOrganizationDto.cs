namespace FoodRescue.Api.DTOs.Organizations;
using System.ComponentModel.DataAnnotations;
public class CreateOrganizationDto
{
	[Required, MinLength(3), MaxLength(100)] public string Name { get; set; } = string.Empty;
	[Required] public string Type { get; set; } = string.Empty;
	[Required, MinLength(3), RegularExpression("^[A-Za-z ]+$")] public string ContactPerson { get; set; } = string.Empty;
	[Required, EmailAddress] public string Email { get; set; } = string.Empty;
	[Required, RegularExpression("^(07\\d{8}|\\+947\\d{8})$")] public string Phone { get; set; } = string.Empty;
	[Required, MinLength(10)] public string Address { get; set; } = string.Empty;
	[Required] public string Status { get; set; } = "Active";
}
