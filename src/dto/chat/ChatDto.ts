class chatDto {
    id
    users
    messages

    constructor(chat: any) {
    this.id = chat._id
      if(chat.users) {
        this.users = chat.users
      }
      if(chat.messages = chat.messages) {
        this.messages = chat.messages
      }
    }
  }
  
  export { chatDto }