import { Maker } from './maker.model';
import { Bedrijf } from './bedrijf.model';

export class Review {
  constructor(
    public reviewID: number,
    public text: string,
    public makerID: number,
    public bedrijfID: number,
    public autheurID: number,
    public datum: Date,
    public aantalLikes: number,
    public makerLikers: Maker[],
    public bedrijfLikers: Bedrijf[],
    public maker: Maker,
    public bedrijf: Bedrijf,
    public magLiken: boolean
  ) {
  }
}
