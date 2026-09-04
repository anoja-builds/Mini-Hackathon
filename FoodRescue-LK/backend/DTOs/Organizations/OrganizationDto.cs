namespace FoodRescue.Api.DTOs.Organizations;
public class OrganizationDto
{
	public int Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public string Type { get; set; } = string.Empty;
	public string ContactPerson { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
	public string Phone { get; set; } = string.Empty;
	public string Address { get; set; } = string.Empty;
	public string Status { get; set; } = string.Empty;
}
