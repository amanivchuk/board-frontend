export class UserCreateDto {
  title: string;
  picture: any;
  text: string;
  dateAdd: Date;


  constructor(title: string, picture: any, text: string, dateAdd: Date) {
    this.title = title;
    this.picture = picture;
    this.text = text;
    this.dateAdd = dateAdd;
  }
}
