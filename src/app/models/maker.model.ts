import { Review } from './review.model';

export class Maker {
  constructor(
    public makerID: number,
    public voornaam: string,
    public achternaam: string,
    public geboortedatum: string,
    public biografie: string,
    public linkedIn: string,
    public ervaring: string,
    public fotoMaker: string,
    public userID: number,
    public reviews: Review[]
  ) {
  }
}












