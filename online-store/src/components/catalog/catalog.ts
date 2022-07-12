import {Item} from "../../models/item.interface";
import {ElementBuilder} from "../../controllers/element-builder";
import {templateCatalog} from "./template-catalog";
import {templateCard} from "../card/template-card";
import {FilterValue} from "../../models/filter-value.interface";
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

            const filterItems: Item[] = this.items.filter((item: Item) => {
                const regExp = new RegExp(`${data?.query ?? ''}`, 'gi');
                return regExp.test(item.model);
            });

            const catalogWrapper: HTMLElement = ElementBuilder.buildElement(
                templateCatalog({count: filterItems.length, cards: filterItems.map((item: Item) => templateCard(item)).join('')})
            );

            appWrapper.append(catalogWrapper);
        });
    }
}