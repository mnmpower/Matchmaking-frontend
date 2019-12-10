export class OpdrachtenFilter {
    public constructor(
        public zoekterm: string = '',
        public maxAfstand: number = 0,
        public minPersonen: number = 0,
        public maxPersonen: number = 0,
        public competitie: boolean = false,
        public bedrijven: number[] = [])
    {}
}
