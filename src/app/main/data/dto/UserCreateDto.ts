export class UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: string;


  constructor(firstName: string, lastName: string, email: string, password: string, userRole: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
  }
}
