class messageDto {
    id
    sender
    content
    chat

    constructor(chat: any) {
        this.id = chat._id
        this.sender = chat.sender
        this.chat = chat.chat
        this.content = chat.content
    }
}
  
  export { messageDto }