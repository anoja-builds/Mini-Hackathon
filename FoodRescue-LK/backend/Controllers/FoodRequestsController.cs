using FoodRescue.Api.DTOs.FoodRequests;
using FoodRescue.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodRescue.Api.Controllers;

[Route("api/foodrequests")]
[ApiController]
public class FoodRequestsController : ControllerBase
{
    private readonly FoodRequestService _service;

    public FoodRequestsController(FoodRequestService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodRequestDto>>> GetFoodRequests([FromQuery] string? district)
    {
        var requests = await _service.GetAllRequestsAsync(district);
        return Ok(requests);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FoodRequestDto>> GetFoodRequest(int id)
    {
        var request = await _service.GetRequestByIdAsync(id);
        if (request == null) return NotFound();
        return Ok(request);
    }

    [HttpPost]
    public async Task<ActionResult<FoodRequestDto>> CreateFoodRequest(CreateFoodRequestDto createDto)
    {
        var result = await _service.CreateRequestAsync(createDto);
        return CreatedAtAction(nameof(GetFoodRequest), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFoodRequest(int id, UpdateFoodRequestDto updateDto)
    {
        var updated = await _service.UpdateRequestAsync(id, updateDto);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFoodRequest(int id)
    {
        var deleted = await _service.DeleteRequestAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}