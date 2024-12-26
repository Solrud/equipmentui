export class News {
  version: string;
  date: Date;
  description: string[];

  constructor(version: string, date: Date, description: string[] = null) {
    this.version = version;
    this.date = date;
    this.description = description;
  }
}
