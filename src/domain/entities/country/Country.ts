export default class Country {

    // Model fields
    public readonly id: number = 0;
    public readonly createdAt: Date = new Date();
    public readonly updatedAt: Date = new Date();
    public readonly name: string = '';
    public readonly iso2: string = '';
    public readonly e164: number = 0;
    public readonly ccy?: string = '';
    public readonly lang?: string = '';

    constructor(params?: Partial<Country>) {
        if (params) {
            Object.assign(this, params);
        }
    }

}