export class News {
  version: string;
  date: string;
  description: string[];

  constructor(version: string, date: string, description: string[] = null) {
    this.version = version;
    this.date = date;
    this.description = description;
  }
}
