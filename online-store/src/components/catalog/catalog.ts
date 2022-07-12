import {Item} from "../../models/item.interface";
import {ElementBuilder} from "../../controllers/element-builder";
import {templateCatalog} from "./template-catalog";
import {templateCard} from "../card/template-card";

export class Catalog {
    private items: Item[] = [];

    constructor(items: Item[]) {
        this.items = items;
    }

    public render(selector: string): void {
        const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

        const catalogWrapper: HTMLElement = ElementBuilder.buildElement(
            templateCatalog({count: this.items.length, cards: this.items.map((item: Item) => templateCard(item)).join('')})
        );

        appWrapper.append(catalogWrapper);
    }
}