class UserDto {
  id
  firstname
  lastname
  email
  photo

  constructor(user: any) {
    this.id = user._id
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.photo = user.photo
  }

  // collection(users: []) {
  //   return users.map((donation => new this(donation)))
  // }
}

export { UserDto }