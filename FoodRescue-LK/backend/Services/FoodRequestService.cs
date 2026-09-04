using FoodRescue.Api.Data;
using FoodRescue.Api.DTOs.FoodRequests;
using FoodRescue.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.Api.Services;

public class FoodRequestService
{
    private readonly AppDbContext _context;

    public FoodRequestService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FoodRequestDto>> GetAllRequestsAsync(string? district)
    {
        var query = _context.FoodRequests.AsQueryable();

        if (!string.IsNullOrEmpty(district))
        {
            query = query.Where(r => r.District.ToLower() == district.ToLower());
        }

        return await query
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new FoodRequestDto
            {
                Id = r.Id,
                FoodType = r.FoodType,
                RequiredQuantity = r.RequiredQuantity,
                District = r.District,
                Location = r.Location,
                RequiredDate = r.RequiredDate,
                ContactInformation = r.ContactInformation,
                Reason = r.Reason,
                Status = r.Status,
                CreatedAt = r.CreatedAt
            }).ToListAsync();
    }

    public async Task<FoodRequestDto?> GetRequestByIdAsync(int id)
    {
        var r = await _context.FoodRequests.FindAsync(id);
        if (r == null) return null;

        return new FoodRequestDto
        {
            Id = r.Id,
            FoodType = r.FoodType,
            RequiredQuantity = r.RequiredQuantity,
            District = r.District,
            Location = r.Location,
            RequiredDate = r.RequiredDate,
            ContactInformation = r.ContactInformation,
            Reason = r.Reason,
            Status = r.Status,
            CreatedAt = r.CreatedAt
        };
    }

    public async Task<FoodRequestDto> CreateRequestAsync(CreateFoodRequestDto createDto)
    {
        var foodRequest = new FoodRequest
        {
            FoodType = createDto.FoodType,
            RequiredQuantity = createDto.RequiredQuantity,
            District = createDto.District,
            Location = createDto.Location,
            RequiredDate = createDto.RequiredDate,
            ContactInformation = createDto.ContactInformation,
            Reason = createDto.Reason,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _context.FoodRequests.Add(foodRequest);
        await _context.SaveChangesAsync();

        return new FoodRequestDto
        {
            Id = foodRequest.Id,
            FoodType = foodRequest.FoodType,
            RequiredQuantity = foodRequest.RequiredQuantity,
            District = foodRequest.District,
            Location = foodRequest.Location,
            RequiredDate = foodRequest.RequiredDate,
            ContactInformation = foodRequest.ContactInformation,
            Reason = foodRequest.Reason,
            Status = foodRequest.Status,
            CreatedAt = foodRequest.CreatedAt
        };
    }

    public async Task<bool> UpdateRequestAsync(int id, UpdateFoodRequestDto updateDto)
    {
        var request = await _context.FoodRequests.FindAsync(id);
        if (request == null) return false;

        request.FoodType = updateDto.FoodType;
        request.RequiredQuantity = updateDto.RequiredQuantity;
        request.District = updateDto.District;
        request.Location = updateDto.Location;
        request.RequiredDate = updateDto.RequiredDate;
        request.ContactInformation = updateDto.ContactInformation;
        request.Reason = updateDto.Reason;
        request.Status = updateDto.Status;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteRequestAsync(int id)
    {
        var request = await _context.FoodRequests.FindAsync(id);
        if (request == null) return false;

        _context.FoodRequests.Remove(request);
        await _context.SaveChangesAsync();
        return true;
    }
}