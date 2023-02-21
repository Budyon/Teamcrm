class UserDto {
  id
  firstname
  lastname
  email
  photo
  company
  projects
  
  constructor(user: any) {
    this.id = user._id
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.photo = user.photo
    if(user.company){
      this.company = user.company
    }
    if(user.projects) {
      this.projects = user.projects
    }
  }
}

export { UserDto }