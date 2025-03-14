using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepository likesRepository) : BaseApiController
{
    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> ToggleLike(int targetUserId)
    {
        var sourceUserId = User.GetUserId();

        if (sourceUserId == targetUserId)
        {
            return BadRequest("You cannot like yourself");
        }

        var exisitingLike = await likesRepository.GetUserLike(sourceUserId, targetUserId);

        if(exisitingLike == null)
        {
            var like = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };

            likesRepository.AddLike(like);
        }
        else
        {
            likesRepository.DeleteLike(exisitingLike);
        }

        if (await likesRepository.SaveChanges())
        {
            return Ok();
        }
        
        return BadRequest("Failed to like user");      
    }

    [HttpGet("list")]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetCurrentUserlikeIds()
    {
        return Ok(await likesRepository.GetCurrentUserLikeIds(User.GetUserId()));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes(string predicate)
    {
        return Ok(await likesRepository.GetUserLikes(predicate, User.GetUserId()));
    }

}
