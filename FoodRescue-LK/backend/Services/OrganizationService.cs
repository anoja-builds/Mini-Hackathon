using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.Organizations;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Services;

public class OrganizationService(AppDbContext db)
{
	public async Task<List<OrganizationDto>> GetAll(string? district = null, string? type = null) => await db.Organizations.AsNoTracking().Where(item => (district == null || item.District == district) && (type == null || item.Type == type)).Select(ToDto).ToListAsync();
	public async Task<OrganizationDto?> Get(int id) => await db.Organizations.AsNoTracking().Where(item => item.Id == id).Select(ToDto).FirstOrDefaultAsync();
	public async Task<OrganizationDto> Create(CreateOrganizationDto dto)
	{
		var organization = new Organization { Name = dto.Name.Trim(), Type = dto.Type, ContactPerson = dto.ContactPerson.Trim(), Email = dto.Email.Trim(), Phone = dto.Phone.Trim(), Address = dto.Address.Trim(), District = dto.District.Trim(), Location = dto.Location.Trim(), Description = dto.Description.Trim(), Status = dto.Status };
		db.Organizations.Add(organization);
		await db.SaveChangesAsync();
		return ToDto.Compile()(organization);
	}
	public async Task<bool> Update(int id, UpdateOrganizationDto dto)
	{
		var organization = await db.Organizations.FindAsync(id);
		if (organization is null) return false;
		organization.Name = dto.Name.Trim(); organization.Type = dto.Type; organization.ContactPerson = dto.ContactPerson.Trim(); organization.Email = dto.Email.Trim(); organization.Phone = dto.Phone.Trim(); organization.Address = dto.Address.Trim(); organization.District = dto.District.Trim(); organization.Location = dto.Location.Trim(); organization.Description = dto.Description.Trim(); organization.Status = dto.Status;
		await db.SaveChangesAsync();
		return true;
	}
	public async Task<bool> Delete(int id)
	{
		var organization = await db.Organizations.FindAsync(id);
		if (organization is null) return false;
		db.Organizations.Remove(organization);
		await db.SaveChangesAsync();
		return true;
	}
	private static readonly System.Linq.Expressions.Expression<Func<Organization, OrganizationDto>> ToDto = item => new OrganizationDto { Id = item.Id, Name = item.Name, Type = item.Type, ContactPerson = item.ContactPerson, Email = item.Email, Phone = item.Phone, Address = item.Address, District = item.District, Location = item.Location, Description = item.Description, Status = item.Status };
}
