import {EventEmitter} from "../../controllers/event-emitter";

export class Favorite {
    private eventEmitter = new EventEmitter();
    private favorites: Set<number> = new Set<number>();

    constructor(favorites?: number[]) {
        if (favorites) {
            this.favorites = new Set(favorites);
        }

        this.render();

        this.eventEmitter.on('reset', () => {
            this.favorites.clear();
            this.render();
        });
    }

    public isFavorite(id: number): boolean {
        return this.favorites.has(id);
    }

    public add(id: number): void {
        this.favorites.add(id);
        this.render();

        localStorage.setItem('favorite', JSON.stringify(Array.from(this.favorites)));
    }

    public remove(id: number): void {
        this.favorites.delete(id);
        this.render();

        localStorage.setItem('favorite', JSON.stringify(Array.from(this.favorites)));
    }

    public toggle(id: number | undefined): boolean {
        if (!id) {
            return false;
        }

        if (this.isFavorite(id)) {
            this.remove(id);
        } else {
            this.add(id);
        }

        return this.isFavorite(id);
    }

    private render(): void {
        const favoriteCount: HTMLElement = document.querySelector('.menu__favorite-count') as HTMLElement;
        const favoriteContent: number = this.favorites.size;

        if (!favoriteContent) {
            favoriteCount.innerText = '';
            favoriteCount.classList.remove('menu__favorite-count_active')
            return;
        }

        favoriteCount.innerText = favoriteContent.toString();
        favoriteCount.classList.add('menu__favorite-count_active');
    }
}