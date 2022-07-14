import {BaseObject} from "./base.interface";

export interface Option extends BaseObject{
    id: number;
    title: string;
    additional: string;
}