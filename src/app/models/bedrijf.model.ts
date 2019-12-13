import { Opdracht } from './opdracht.model';
import { Review } from './review.model';

export class Bedrijf {
  constructor(
    public bedrijfID: number,
    public bedrijfsnaam: string,
    public locatie: string,
    public biografie: string,
    public fotoBedrijf: string,
    public userID: number,
    public opdrachten: Opdracht[],
    public reviews: Review[]
  ) {
  }
}
