export class Bedrijf {
  constructor(
    public bedrijfID: number,
    public bedrijfsnaam: string,
    public passwoord: string,
    public contactInfo: string,
    public locatie: string,
    public biografie: string,
    public fotoBedrijf: string
  ) {
  }
}
