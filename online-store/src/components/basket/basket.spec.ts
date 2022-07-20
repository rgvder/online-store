import {Basket} from "./basket";

const initial: [[number, number]] = [[1, 3]];
const map = new Map<number, number>(initial);

describe('basket init', () => {
    document.body.innerHTML = `<div class="menu__basket-count"></div>`

    test('empty basket', () => {
        let basket = new Basket();

        expect(basket['items']).toEqual(new Map([]));
        Basket['instance'] = null;
    });

    test('fill basket', () => {
        let basket2 = new Basket(initial);
        expect(basket2).toBeTruthy();
        expect(basket2['items']).toEqual(map);
    });
});

describe('basket methods', () => {
    document.body.innerHTML = `<div class="menu__basket-count"></div>`;
    let basket = new Basket();

    test('add', () => {
        basket['add'](3);
        expect(basket['items'].get(3)).toBe(1);
        basket['add'](3);
        expect(basket['items'].get(3)).toBe(2);
    });

    test('remove', () => {
        basket['remove'](3);
        expect(basket['items'].get(3)).toBe(1);
    });

    test('count value', () => {
        expect(basket.getCountValue(3)).toBe(1);
    });

    test('fake count value', () => {
        expect(basket.getCountValue(1)).toBe(0);
    });
});



