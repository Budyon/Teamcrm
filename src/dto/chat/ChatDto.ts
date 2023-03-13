class chatDto {
    id
    users
    messages
    photo

    constructor(chat: any) {
    this.id = chat._id
    this.photo = chat.photo
      if(chat.users) {
        this.users = chat.users
      }
      if(chat.messages = chat.messages) {
        this.messages = chat.messages
      }
    }
  }
  
  export { chatDto }