class projectDto {
    id
    projectName
    managerId
    owner_id
    description
    projectAddress
    projectWebpage
    projectPhone
    projectLogo
    users
    tasks
    companyId
    columns

    constructor(project: any) {
      this.id = project._id
      this.projectName = project.projectName
      this.managerId = project.managerId
      this.owner_id = project.owner_id
      this.description = project.description
      this.projectAddress = project.projectAddress
      this.projectWebpage = project.projectWebpage
      this.projectPhone = project.projectPhone
      this.projectLogo = project.projectLogo
      this.companyId = project.companyId
        if(project.users) {
          this.users = project.users
        }
        if(project.tasks) {
          this.tasks = project.tasks
        }
        if(project.columns) {
          this.columns = project.columns
        }
    }
}
  
  export { projectDto }