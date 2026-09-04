using System.ComponentModel.DataAnnotations;

namespace FoodRescue.Api.Models;

public class Organization
{
	public int Id { get; set; }
	[Required, MaxLength(100)] public string Name { get; set; } = string.Empty;
	[Required, MaxLength(50)] public string Type { get; set; } = string.Empty;
	[Required, MaxLength(100)] public string ContactPerson { get; set; } = string.Empty;
	[Required, MaxLength(254)] public string Email { get; set; } = string.Empty;
	[Required, MaxLength(20)] public string Phone { get; set; } = string.Empty;
	[Required, MaxLength(250)] public string Address { get; set; } = string.Empty;
	[Required, MaxLength(20)] public string Status { get; set; } = "Active";
}
