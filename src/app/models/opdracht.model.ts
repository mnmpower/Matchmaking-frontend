import { Bedrijf } from './bedrijf.model';
import { Status } from './status.model';
import { Maker } from './maker.model';

export class Opdracht {
  bedrijf: Bedrijf;
  constructor(
    public opdrachtID: number,
    public titel: string,
    public omschrijving: string,
    public locatie: string,
    public competitie: boolean,
    public bedrijfID: number,
    public aantalPersonen: number,
    public statusID: number,
    public afstand: number,
    public status: Status,
    public makers: Maker[],
  ) {
  }
}
