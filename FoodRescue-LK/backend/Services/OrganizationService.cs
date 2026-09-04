using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.Organizations;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Services;

public class OrganizationService(AppDbContext db)
{
	public async Task<List<OrganizationDto>> GetAll() => await db.Organizations.AsNoTracking().Select(ToDto).ToListAsync();
	public async Task<OrganizationDto?> Get(int id) => await db.Organizations.AsNoTracking().Where(item => item.Id == id).Select(ToDto).FirstOrDefaultAsync();
	public async Task<OrganizationDto> Create(CreateOrganizationDto dto)
	{
		var organization = new Organization { Name = dto.Name.Trim(), Type = dto.Type, ContactPerson = dto.ContactPerson.Trim(), Email = dto.Email.Trim(), Phone = dto.Phone.Trim(), Address = dto.Address.Trim(), Status = dto.Status };
		db.Organizations.Add(organization);
		await db.SaveChangesAsync();
		return ToDto.Compile()(organization);
	}
	public async Task<bool> Update(int id, UpdateOrganizationDto dto)
	{
		var organization = await db.Organizations.FindAsync(id);
		if (organization is null) return false;
		organization.Name = dto.Name.Trim(); organization.Type = dto.Type; organization.ContactPerson = dto.ContactPerson.Trim(); organization.Email = dto.Email.Trim(); organization.Phone = dto.Phone.Trim(); organization.Address = dto.Address.Trim(); organization.Status = dto.Status;
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
	private static readonly System.Linq.Expressions.Expression<Func<Organization, OrganizationDto>> ToDto = item => new OrganizationDto { Id = item.Id, Name = item.Name, Type = item.Type, ContactPerson = item.ContactPerson, Email = item.Email, Phone = item.Phone, Address = item.Address, Status = item.Status };
}
