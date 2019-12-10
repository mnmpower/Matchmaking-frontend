export class OpdrachtenFilter {
    public constructor(
        public offset: number = 0,
        public limit: number = 0,
        public zoekterm: string = '',
        public maxAfstand: number = 0,
        public minPersonen: number = 0,
        public maxPersonen: number = 0,
        public competitie: boolean = false,
        public bedrijven: number[] = [])
    {}
}
