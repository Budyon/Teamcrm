class projectDto {
    id
    name
    owner_id
    description
    address
    webpage
    phonenumber
    logo
    users
    tasks
    companyId

    constructor(project: any) {
    this.id = project._id
    this.name = project.name
    this.owner_id = project.owner_id
    this.description = project.description
    this.address = project.address
    this.webpage = project.webpage
    this.phonenumber = project.phonenumber
    this.logo = project.logo
    this.companyId = project.companyId
      if(project.users) {
        this.users = project.users
      }
      if(project.tasks) {
        this.tasks = project.tasks
      }
    }
  }
  
  export { projectDto }

