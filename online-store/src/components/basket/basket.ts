import {EventEmitter} from "../../controllers/event-emitter";
import {Item} from "../../models/item.interface";
import {Notification} from "../notification/notification";

export class Basket {
    private items: Map<number, number>;
    private static instance: Basket;
    private eventEmitter = new EventEmitter();
    private notification = new Notification();

    constructor(items?: [[number, number]]) {
        this.items = new Map<number, number>(items || []);
        this.render();

        this.eventEmitter.on('addToBasket', (data: Partial<Item>) => {
            console.log(this.items.values());

            const productCount: number = Array.from(this.items.values()).reduce((sum: number, item: number) => sum + item, 0);

            if (productCount < 20) {
                if (!data.id || !data.count) {
                    return;
                }

                const mapId: number = this.items.get(data.id) || 0;


                if (data.id && mapId < data.count) {
                    this.add(data.id);
                    this.render();
                }
            } else {
                this.notification.render('Извините, все слоты заполнены');
            }

        })

        this.eventEmitter.on('removeFromBasket', (data: Partial<Item>) => {
            if (data.id) {
                this.remove(data.id);
                this.render();
            }
        })

        this.eventEmitter.on('reset', () => {
            this.items.clear();
            this.render();
        });

        if (Basket.instance) {
            return Basket.instance;
        }

        Basket.instance = this;
        return this;
    }

    private add(id: number): void {
        this.items.set(id, (this.items.get(id) || 0) + 1);
        console.log(this.items.entries(), JSON.stringify(this.items.entries()));

        localStorage.setItem('basket', JSON.stringify(Array.from(this.items.entries())));
    }

    private remove(id: number): void {
        const itemsGet: number | undefined = this.items.get(id);
        if (!itemsGet) {
            return;
        }
        if (itemsGet <= 1) {
            this.items.delete(id);
        } else {
            this.items.set(id, itemsGet - 1);
        }

        localStorage.setItem('basket', JSON.stringify(Array.from(this.items.entries())));
    }

    private render() {
        const basketCount: HTMLElement = document.querySelector('.menu__basket-count') as HTMLElement;

        if (!this.items?.size) {
            basketCount.innerText = '';
            return;
        }

        basketCount.innerText = Array.from(this.items.values()).reduce((sum: number, item: number) => sum + item, 0).toString();
    }

    public getCountValue(id: number):number {
        return this.items?.get(id) || 0;
    }
}