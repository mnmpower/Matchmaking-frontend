import { Bedrijf } from './bedrijf.model';

export class Opdracht {
  constructor(
    public opdrachtID: number,
    public titel: string,
    public omschrijving: string,
    public locatie: string,
    public competitie: boolean,
    public bedrijfID: number,
    public aantalPersonen: number,
    public statusID: number,
    public afstand: number
  ) {
  }
}
