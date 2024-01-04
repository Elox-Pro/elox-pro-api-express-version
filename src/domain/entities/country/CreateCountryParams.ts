export default class CreateCountryParams {
    constructor(
        public readonly name: string,
        public readonly iso2: string,
        public readonly e164: number
    ) { }
}