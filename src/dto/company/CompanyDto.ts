class CompanyDto {
    id
    name
    owner_id
    description
    address
    webpage
    phonenumber
    logo
    users
    projects

    constructor(company: any) {
      this.id = company._id
      this.name = company.name
      this.owner_id = company.owner_id
      this.description = company.description
      this.address = company.address
      this.webpage = company.webpage
      this.phonenumber = company.phonenumber
      this.logo = company.logo
        if(company.users) {
          this.users = company.users
        }
        if(company.projects = company.projects) {
          this.projects = company.projects
        }
    }
}
  
  export { CompanyDto }