class notifDto {
    id
    sender
    reciver
    content
    chat

    constructor(notif: any) {
        this.id = notif._id
        this.sender = notif.sender
        this.reciver = notif.reciver
        this.content = notif.content
        this.chat = notif.chat
    }
}
  
  export { notifDto }