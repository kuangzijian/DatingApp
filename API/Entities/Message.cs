namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public required string SenderUsername { get; set; }
    public int SenderId { get; set; }
    public AppUser Sender { get; set; } = null!;
    public required string RecipientUsername { get; set; }
    public int RecipientId { get; set; }
    public AppUser Recipient { get; set; } = null!;
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; } = DateTime.Now;
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }
}
