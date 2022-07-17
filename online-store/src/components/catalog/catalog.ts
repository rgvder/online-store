import {Item} from "../../models/item.interface";
import {ElementBuilder} from "../../controllers/element-builder";
import {templateCatalog} from "./template-catalog";
import {templateCard} from "../card/template-card";
import {FilterValue, Sorting} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Basket} from "../basket/basket";
import {Favorite} from "../favorite/favorite";

export class Catalog {
    private items: Item[] = [];
    private eventEmitter: EventEmitter = new EventEmitter();
    private basket: Basket;
    private favorite: Favorite;

    constructor(items: Item[]) {
        const basketStorage: [[number, number]] = JSON.parse(localStorage.getItem('basket') || 'null') as [[number, number]];
        const favoriteStorage: number[] = JSON.parse(localStorage.getItem('favorite') || 'null') as number[];

        this.items = items;
        this.basket = new Basket(basketStorage);
        this.favorite = new Favorite(favoriteStorage);
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
                    const isPopular = !data.isPopular || item.isPopular;
                    let isPrice = true;
                    let isSuctionPower = true;

                    if (data.price?.[0] && data.price?.[1]) {
                        isPrice = item.price >= data.price[0] && item.price <= data.price[1];
                    }

                    if (data.suctionPower?.[0] && data.suctionPower?.[1]) {
                        isSuctionPower = item.suctionPower >= data.suctionPower[0] && item.suctionPower <= data.suctionPower[1];
                    }

                    return isQuery && isBrand && isCleaningType && isColor && isPrice && isSuctionPower && isPopular;

                })
                .sort((a: Item, b: Item) => {
                    if (data.sorting === Sorting.NameAsc) {
                        return a.model < b.model ? -1 : 1;
                    }

                    if (data.sorting === Sorting.NameDesc) {
                        return a.model > b.model ? -1 : 1;
                    }

                    if (data.sorting === Sorting.PriceAsc) {
                        return a.price - b.price;
                    }

                    if (data.sorting === Sorting.PriceDesc) {
                        return b.price - a.price;
                    }

                    return b.rating - a.rating;
                });

            const catalogWrapper: HTMLElement = ElementBuilder.buildElement(
                templateCatalog({
                    count: filterItems.length,
                    cards: filterItems.map((item: Item) => templateCard({
                        ...item,
                        basketCount: this.basket.getCountValue(item.id) || '',
                        isFavorite: this.favorite.isFavorite(item.id) ? 'favorite-active' : '',
                    })).join('')
                })
            );

            appWrapper.append(catalogWrapper);
            this.addListeners();
        });
    }

    private addListeners():void {
        const basketAdd: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.basket-add');
        const basketRemove: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.basket-remove');
        const buttonsFavorite: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-favorite');

        basketAdd.forEach((button: HTMLButtonElement) => {
            button.addEventListener('click', () => {
                const itemInBasket: Item | undefined = this.items.find((item: Item) => item.id === +(button.dataset?.id || -1));
                const basketCount: HTMLElement = button.parentElement?.querySelector('.basket-count') as HTMLElement;

                if (itemInBasket) {
                    this.eventEmitter.emit('addToBasket', itemInBasket);
                    const cardBasketContent: number = this.basket.getCountValue(itemInBasket.id);
                    basketCount.innerText = cardBasketContent ? cardBasketContent.toString() : '';

                    button.parentElement?.classList.toggle('button_expanded', !!cardBasketContent);
                }
            })
        })

        basketRemove.forEach((button: HTMLButtonElement) => {
            button.addEventListener('click', () => {
                const itemInBasket: Item | undefined = this.items.find((item: Item) => item.id === +(button.dataset?.id || -1));
                const basketCount: HTMLElement = button.parentElement?.querySelector('.basket-count') as HTMLElement;

                if (itemInBasket) {
                    this.eventEmitter.emit('removeFromBasket', itemInBasket);
                    const cardBasketContent: number = this.basket.getCountValue(itemInBasket.id);
                    basketCount.innerText = cardBasketContent ? cardBasketContent.toString() : '';

                    button.parentElement?.classList.toggle('button_expanded', !!cardBasketContent);
                }
            })
        })

        buttonsFavorite.forEach((button: HTMLButtonElement) => {
            button.addEventListener('click', () => {
                button.classList.toggle('favorite-active', this.favorite.toggle(+(button.dataset.id || 0)));
            })
        })
    }
}