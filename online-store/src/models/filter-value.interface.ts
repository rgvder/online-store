export enum Sotring {
    NameAsc = 'nameAsc',
    NameDesc = 'nameDesc',
    PriceAsc = 'priceAsc',
    PriceDesc = 'priceDesc',
    Rating = 'rating',
}

export interface FilterValue extends Record<string, string | number | boolean> {
    query: string;
    sorting: Sotring;
}
