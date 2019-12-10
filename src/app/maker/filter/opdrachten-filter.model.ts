export class OpdrachtenFilter {
    public constructor(
        public offset: number = 0,
        public limit: number = 0,
        public zoekterm: string = '',
        public maxAfstand: number = 0,
        public longitude: number = 0,
        public latitude: number = 0,
        public minPersonen: number = 0,
        public maxPersonen: number = 0,
        public competitie: string = 'all',
        public bedrijven: number[] = [])
    {}
}
