export class Board {
  id: number;
  title: string;
  picture: any;
  text: string;
  dateAdd: Date;
  author: string;


  constructor(id: number, title: string, picture: any, text: string, dateAdd: Date, author: string) {
    this.id = id;
    this.title = title;
    this.picture = picture;
    this.text = text;
    this.dateAdd = dateAdd;
    this.author = author;
  }
}
