import {BaseObject} from "./base.interface";

export enum Sorting {
    NameAsc = 'nameAsc',
    NameDesc = 'nameDesc',
    PriceAsc = 'priceAsc',
    PriceDesc = 'priceDesc',
    Rating = 'rating',
}

export interface FilterValue extends BaseObject {
    query: string;
    sorting: Sorting;
    brand: number[];
    price: number[];
    suctionPower: number[];
    cleaningType: number[];
    color: number[];
    isPopular: boolean;
}
