import {BaseObject} from "./base.interface";

export enum Sotring {
    NameAsc = 'nameAsc',
    NameDesc = 'nameDesc',
    PriceAsc = 'priceAsc',
    PriceDesc = 'priceDesc',
    Rating = 'rating',
}

export interface FilterValue extends BaseObject {
    query: string;
    sorting: Sotring;
    brand: number[];
    price: number[];
}
