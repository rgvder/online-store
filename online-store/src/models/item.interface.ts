import {BaseObject} from "./base.interface";

export interface Item extends BaseObject {
    id: number;
    image: string;
    brand: string;
    model: string;
    color: string;
    price: number;
    rating: number;
    count: number;
    suctionPower: number;
    cleaningType: string;
    isPopular: boolean;
    info: string;
}
