export class Review {
  constructor(
    public reviewID: number,
    public text: string,
    public makerID: number,
    public bedrijfID: number,
    public aantalLikes: number
  ) {
  }
}
