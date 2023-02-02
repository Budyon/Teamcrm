class UserDto {
  id
  firstname
  lastname
  email
  photo
  companyId

  constructor(user: any) {
    this.id = user._id
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.photo = user.photo
    this.companyId = user.companyId
  }
}

export { UserDto }