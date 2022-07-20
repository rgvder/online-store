import {Favorite} from "./favorite";

const initial = [1, 5, 4, 9];
const set = new Set<number>(initial);

describe('favorite init', () => {
    document.body.innerHTML = `<div class="menu__favorite-count"></div>`

    test('empty favorite', () => {
        const favorite = new Favorite();
        expect(favorite['favorites']).toEqual(new Set());
    });

    test('fill favorite', () => {
        const favorite2 = new Favorite(initial);
        expect(favorite2).toBeTruthy();
        expect(favorite2['favorites']).toEqual(set);
    });
});

describe('favorite methods', () => {
    document.body.innerHTML = `<div class="menu__favorite-count"></div>`;
    const favorite = new Favorite();

    test('add', () => {
        favorite.add(3);
        expect(favorite['favorites'].has(3)).toBeTruthy();
        favorite.add(1);
        expect(favorite['favorites'].has(1)).toBeTruthy();
    });

    test('remove', () => {
        favorite.remove(3);
        expect(favorite['favorites'].has(3)).not.toBeTruthy();
    });

    test('isFavorite', () => {
        favorite.isFavorite(3);
        expect(favorite['favorites'].has(3)).not.toBeTruthy();
        expect(favorite['favorites'].has(1)).toBeTruthy();
    });
});



