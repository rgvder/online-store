import {BaseObject} from "../models/base.interface";

export class ElementBuilder {

    public static buildElement(markup: string): HTMLElement {
        const templateEl: HTMLTemplateElement = document.createElement('template');
        templateEl.innerHTML = markup;

        return templateEl.content.cloneNode(true) as HTMLElement;
    }

    public static buildTemplate<T extends BaseObject>(strings: TemplateStringsArray, ...keys: string[]) {
        return (function(obj: T): string {

            return keys.reduce((result: string, key: string, i: number) => {

                return `${result}${ElementBuilder.convertToString(obj[key])}${strings[i + 1]}`;
            }, strings[0]);

        });
    }

    public static convertToString(value: string | number | boolean | number[]): string {
        return typeof value === 'string' ? value : value.toString();
    }

}