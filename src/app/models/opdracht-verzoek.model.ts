export class OpdrachtVerzoek {
  constructor(
    public opdrachtVerzoekID: number,
    public opdrachtID: number,
    public bedrijfID: number,
    public makerID: number,
    public bevestiging: boolean
  ) {
  }
}
