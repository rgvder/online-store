import {Item} from "../../models/item.interface";
import {ElementBuilder} from "../../controllers/element-builder";
import {templateCatalog} from "./template-catalog";
import {templateCard} from "../card/template-card";
import {FilterValue, Sotring} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";

export class Catalog {
    private items: Item[] = [];
    private eventEmitter: EventEmitter = new EventEmitter();

    constructor(items: Item[]) {
        this.items = items;
    }

    public render(selector: string): void {
        this.eventEmitter.on('filterChange', (data: Partial<FilterValue>) => {
            const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

            appWrapper.innerHTML = '';

            const filterItems: Item[] = this.items
                .filter((item: Item) => {
                    const regExp = new RegExp(`${data?.query ?? ''}`, 'gi');
                    const isQuery: boolean = regExp.test(item.model);
                    const isBrand = !data.brand?.length || data.brand.includes(item.brandId);
                    const isCleaningType = !data.cleaningType?.length || data.cleaningType.includes(item.cleaningTypeId);
                    const isColor = !data.color?.length || data.color.includes(item.colorId);
                    let isPrice = true;

                    if (data.price?.[0] && data.price?.[1]) {
                        isPrice = item.price >= data.price[0] && item.price <= data.price[1];
                    }

                    return isQuery && isBrand && isCleaningType && isColor && isPrice;

                })
                .sort((a: Item, b: Item) => {
                    if (data.sorting === Sotring.NameAsc) {
                        return a.model < b.model ? -1 : 1;
                    }

                    if (data.sorting === Sotring.NameDesc) {
                        return a.model > b.model ? -1 : 1;
                    }

                    if (data.sorting === Sotring.PriceAsc) {
                        return a.price - b.price;
                    }

                    if (data.sorting === Sotring.PriceDesc) {
                        return b.price - a.price;
                    }

                    return b.rating - a.rating;
                });

            const catalogWrapper: HTMLElement = ElementBuilder.buildElement(
                templateCatalog({count: filterItems.length, cards: filterItems.map((item: Item) => templateCard(item)).join('')})
            );

            appWrapper.append(catalogWrapper);
        });
    }
}