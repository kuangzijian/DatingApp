using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Data;

public class MessageRepository(DataContext dataContext) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        dataContext.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        dataContext.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(int id)
    {
        return await dataContext.Messages.FindAsync(id);
    }

    public Task<PagedList<MessageDto>> GetMessagesForUser()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MessageDto>> GetMessageThread(string username, string recipientUsername)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await dataContext.SaveChangesAsync() > 0;
    }
}
