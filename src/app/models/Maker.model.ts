import DateTimeFormat = Intl.DateTimeFormat;

export class Maker {
  constructor(
    public makerID: number,
    public nickname: string,
    public email: string,
    public naam: string,
    public gebortedatum: string,
    public biografie: string,
    public linkedIn: string,
    public ervaring: string,
    public contactInfo: string,
    public passwoord: string,
    public fotoMaker: string,
  ) {
  }
}
