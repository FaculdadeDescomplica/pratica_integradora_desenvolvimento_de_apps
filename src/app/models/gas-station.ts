export class GasStationSql {

    constructor(
        public id: string,
        public title: string,
        public address: string,
        public number: string,
        public city: string,
        public lat: number,
        public lng: number) {
    }
}
export class GasStation {

    constructor(
        public id: string,
        public title: string,
        public address: string,
        public number: string,
        public city: string,
        public lat: number,
        public lng: number,
        public fuels: Fuel[],) {
    }
}
export class Fuel{
    constructor(
        public id: string,
        public name: string,
        public price: number) {
    }

}
/** "id": 1,
        "title": "Posto Novo",
        "addresss": "Av Amazonas",
        "number": "4000",
        "city": "Belo Horizonte",
        "lat": -22.9105318,
        "lng": -43.2364147 */
