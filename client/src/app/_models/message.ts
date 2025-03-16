export interface Message {
    id: number
    content: string
    senderUsername: string
    senderPhotoUrl: string
    senderId: number
    recipientUsername: string
    recipientPhotoUrl: string
    recipientId: number
    dateRead?: Date
    messageSent: Date
  }
  