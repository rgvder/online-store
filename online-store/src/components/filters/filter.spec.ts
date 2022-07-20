import {Filter} from "./filter";

describe('filter', () => {
    const filter = new Filter([], [], [], []);

    test('filter property', () => {
        expect(filter['items']).toBeTruthy();
    });

    test('countMinValue', () => {
        expect(filter['countMinValue']([1, 5, 76, 3])).toBe(1);
    });

    test('countMaxValue', () => {
        expect(filter['countMaxValue']([1, 5, 76, 3])).toBe(76);
    });
});