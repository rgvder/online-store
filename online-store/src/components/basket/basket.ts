import {EventEmitter} from "../../controllers/event-emitter";
import {Item} from "../../models/item.interface";

export class Basket {
    private items: Map<number, number>;
    private eventEmitter: EventEmitter = new EventEmitter();

    constructor(items: Map<number, number>) {
        this.items = items;
        this.render();

        this.eventEmitter.on('addToBasket', (data: Partial<Item>) => {
            if (data.id) {
                this.add(data.id);
                this.render();
            }
        })

        this.eventEmitter.on('removeFromBasket', (data: Partial<Item>) => {
            if (data.id) {
                this.remove(data.id);
                this.render();
            }
        })
    }

    private add(id: number): void {
        this.items.set(id, (this.items.get(id) || 0) + 1);
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
    }

    private render() {
        const basketCount: HTMLElement = document.querySelector('.basket__count') as HTMLElement;

        if (!this.items.size) {
            return;
        }

        basketCount.innerText = Array.from(this.items.values()).reduce((sum: number, item: number) => sum + item, 0).toString();
    }
}