import {Catalog} from "./catalog";

describe('catalog', () => {
    document.body.innerHTML = `
<div class="menu__basket-count"></div>
<div class="menu__favorite-count"></div>`

    let items = [{
        "id": 1,
        "image": "source/items/1.Roborock-S5-MAX-white.webp",
        "brand": "Roborock",
        "brandId": 0,
        "model": "Roborock S5 MAX",
        "color": "белый",
        "colorId": 200,
        "price": 32990,
        "rating": 5,
        "count": 6,
        "suctionPower": 58,
        "cleaningType": "сухая и влажная",
        "cleaningTypeId": 101,
        "isPopular": true
    }];

    let catalog = new Catalog(items);

    test('basket instance', () => {
        expect(catalog['basket']).toBeTruthy();
    });

    test('favorite instance', () => {
        expect(catalog['favorite']).toBeTruthy();
    });
});