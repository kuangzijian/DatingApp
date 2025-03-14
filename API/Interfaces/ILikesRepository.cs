using API.DTOs;
using API.Entities;
using AutoMapper.Execution;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLike(int sourceUserId, int likedUserId);
    Task<IEnumerable<MemberDto>> GetUserLikes(string predicate, int userId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(UserLike userLike);
    void AddLike(UserLike userLike);
    Task<bool> SaveChanges();
}
