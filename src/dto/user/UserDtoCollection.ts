import { UserDto } from "./UserDto"

function UserDtoCollection (users: any) {
    return users.map(((user: any) => new UserDto(user))) 
}

export { UserDtoCollection }