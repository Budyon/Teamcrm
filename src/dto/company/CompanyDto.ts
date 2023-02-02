class CompanyDto {
    id
    name
    owner_id
    description
    address
    webpage
    phonenumber

    constructor(user: any) {
    this.id = user._id
    this.name = user.name
    this.owner_id = user.owner_id
    this.description = user.description
    this.address = user.address
    this.webpage = user.webpage
    this.phonenumber = user.phonenumber
    }
  }
  
  export { CompanyDto }