import {ElementBuilder} from "../element-builder";

const obj = {key: 'text'};
const template = ElementBuilder.buildTemplate`<span>${'key'}</span>`;

describe('element builder', () => {

    test('method buildTemplate', () => {
        expect(template(obj)).toEqual('<span>text</span>');
    });

    test('method convertToString(number)', () => {
        expect(ElementBuilder.convertToString(465)).toBe('465');
    });

    test('method convertToString(string)', () => {
        expect(ElementBuilder.convertToString('AABBCC')).toBe('AABBCC');
    });
});