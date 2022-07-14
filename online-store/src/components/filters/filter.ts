import {ElementBuilder} from "../../controllers/element-builder";
import {templateCheckbox, templateFilter} from "./template-filter";
import {FilterValue, Sotring} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Loader} from "../../controllers/loader";
import {Brand} from "../../models/catalog.interface";
import * as noUiSlider from 'nouislider';
import {Item} from "../../models/item.interface";

export class Filter {
    private value: FilterValue = {query: '', sorting: Sotring.Rating, brand: [], price: []};
    private eventEmitter: EventEmitter = new EventEmitter();
    private loader: Loader = new Loader();
    private filterBrand: Brand[] = [];
    private items: Item[] = [];

    constructor(brands: Brand[], items: Item[], initialValue?: FilterValue) {
        if (initialValue) {
            this.value = initialValue;
        }

        this.items = items;
        this.filterBrand = brands;
    }

    public render(selector: string): void {
        const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

        const filterWrapper: HTMLElement = ElementBuilder.buildElement(
            templateFilter({brandCheckbox: this.filterBrand.map((item: Brand) => templateCheckbox(item)).join('')})
        );

        appWrapper.prepend(filterWrapper);

        this.eventEmitter.emit('filterChange', this.value);

        // Фильтр по цене

        const filterPrice: noUiSlider.target = document.querySelector('.price__slider') as noUiSlider.target;
        const inputStart: HTMLInputElement = document.querySelector('#inputStart') as HTMLInputElement;
        const inputEnd: HTMLInputElement = document.querySelector('#inputEnd') as HTMLInputElement;
        const inputs = [inputStart, inputEnd];
        const arrPrice: number[] = this.items.map((item: Item) => item.price);
        const minPrice = Math.min(...arrPrice);
        const maxPrice = Math.max(...arrPrice);

        inputStart.setAttribute('placeholder', minPrice.toString());
        inputEnd.setAttribute('placeholder', maxPrice.toString());

        noUiSlider.create(filterPrice, {
            start: [minPrice, maxPrice],
            connect: true,
            tooltips: true,
            padding: 0,
            step: 1,
            range: {
                'min': minPrice,
                'max': maxPrice
            },
            format: {
                to: (value: number) => Math.round(value),
                from: (value: string) => parseInt(value, 10)
            }
        });

        filterPrice.noUiSlider?.on('update', ((values: (number | string)[], handle: number) => {
            inputs[handle].value = <string>values[handle];
        }))
        const arr: number[] = [minPrice, maxPrice];

        const filterSlider = (index: number, value: number) => {
            arr[index] = value;

            this.value.price = arr;

            console.log(arr);

            filterPrice.noUiSlider?.set(arr);
        };

        inputs.forEach((element: HTMLInputElement, index: number) => {
            element.addEventListener('input', () => {
                    filterSlider(index, +element.value);
            });
        });

        this.addListeners();
    }

    private addListeners(): void {
        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;

        const queryInput: HTMLInputElement = form.elements.namedItem('query') as HTMLInputElement;

        queryInput
            ?.addEventListener("input", (e: Event) => {
                const input: HTMLInputElement = e.target as HTMLInputElement;

                if (this.value.query === input.value) {
                    return;
                }

                this.value.query = input.validity.valid ? input.value : '';
                this.eventEmitter.emit('filterChange', this.value);
            });

        document
            ?.querySelector<HTMLElement>("#queryButton")
            ?.addEventListener('click', () => {
                queryInput.value = '';
                this.value.query = '';
            });

        const sortingSelect: HTMLSelectElement = form.elements.namedItem('sorting') as HTMLSelectElement;

        sortingSelect.addEventListener('change', () => {
            this.value.sorting = sortingSelect.value as Sotring;
            this.eventEmitter.emit('filterChange', this.value);
        });

        const brandCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('brandCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;

        Array.from<HTMLInputElement>(brandCheckboxes).forEach((element: HTMLInputElement) => {
            element.addEventListener('change', () => {
                const set: Set<number> = new Set(this.value.brand);
                if (element.checked) {
                    set.add(+element.id);
                } else {
                    set.delete(+element.id);
                }

                this.value.brand = Array.from(set);
                this.eventEmitter.emit('filterChange', this.value);
            })
        })

// Фильтр по цене
        const filterPrice: noUiSlider.target = document.querySelector('.price__slider') as noUiSlider.target;

        filterPrice.noUiSlider?.on('change', ((values: (number | string)[]) => {
            this.value.price = values as number[];
            this.eventEmitter.emit('filterChange', this.value);
        }))
    }
}