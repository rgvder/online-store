import {ElementBuilder} from "../../controllers/element-builder";
import {templateCheckbox, templateFilter, templateColorCheckbox, templateRangeSlider} from "./template-filter";
import {FilterValue, Sotring} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Option} from "../../models/catalog.interface";
import * as noUiSlider from 'nouislider';
import Choices from 'choices.js';
import {Item} from "../../models/item.interface";

export class Filter {
    private value: FilterValue = {query: '', sorting: Sotring.Rating, brand: [], price: [], cleaningType: [], color: [], suctionPower: [], isPopular: false};
    private eventEmitter: EventEmitter = new EventEmitter();
    private filterBrand: Option[] = [];
    private cleaningType: Option[] = [];
    private color: Option[] = [];
    private items: Item[] = [];

    constructor(brands: Option[], items: Item[], cleaningType: Option[], color: Option[], initialValue?: FilterValue) {
        if (initialValue) {
            this.value = initialValue;
        }

        this.items = items;
        this.filterBrand = brands;
        this.cleaningType = cleaningType;
        this.color = color;
    }

    public render(selector: string): void {
        const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

        const filterWrapper: HTMLElement = ElementBuilder.buildElement(
            templateFilter({
                brandCheckbox: this.filterBrand.map((item: Option) => templateCheckbox(item)).join(''),
                cleaningTypeCheckbox: this.cleaningType.map((item: Option) => templateCheckbox(item)).join(''),
                colorCheckbox: this.color.map((item: Option) => templateColorCheckbox(item)).join(''),
                sliderPrice: templateRangeSlider({selector: 'price', title: 'Цена', unit: '₽'}),
                sliderSuctionPower: templateRangeSlider({selector: 'suction-power', title: 'Мощность всасывания', unit: 'Вт'})
            })
        );

        appWrapper.prepend(filterWrapper);
        this.eventEmitter.emit('filterChange', this.value);

        // Сортировка
        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;
        const sortingSelect: HTMLSelectElement = form.elements.namedItem('sorting') as HTMLSelectElement;
        const choices = new Choices(sortingSelect, {
            searchEnabled: false,
            searchChoices: false,
            itemSelectText: '',
            position: 'auto',
            sorter: () => 1,
        });

        // Фильтр по цене


        const arrPrice: number[] = this.items.map((item: Item) => item.price);
        const arrSuctionPower: number[] = this.items.map((item: Item) => item.suctionPower);

        this.addRangeSlider('.price', arrPrice, 'price');
        this.addRangeSlider('.suction-power', arrSuctionPower, 'suctionPower');

    }

    private addRangeSlider(selector: string, arrayValues: number[], key: 'price' | 'suctionPower'): void {
        const sliderWrapper: noUiSlider.target = document.querySelector(selector) as noUiSlider.target;
        const slider: noUiSlider.target = sliderWrapper.querySelector('.slider__wrapper') as noUiSlider.target;
        const inputStart: HTMLInputElement = sliderWrapper.querySelector('.input-start') as HTMLInputElement;
        const inputEnd: HTMLInputElement = sliderWrapper.querySelector('.input-end') as HTMLInputElement;
        const inputs = [inputStart, inputEnd];
        const min: number = Math.min(...arrayValues);
        const max: number = Math.max(...arrayValues);

        inputStart.setAttribute('placeholder', min.toString());
        inputEnd.setAttribute('placeholder', max.toString());

        noUiSlider.create(slider, {
            start: [min, max],
            connect: true,
            tooltips: true,
            padding: 0,
            step: 1,
            range: {
                'min': min,
                'max': max
            },
            format: {
                to: (value: number) => Math.round(value),
                from: (value: string) => parseInt(value, 10)
            }
        });

        slider.noUiSlider?.on('update', ((values: (number | string)[], handle: number) => {
            inputs[handle].value = <string>values[handle];
        }))
        const arr: number[] = [min, max];

        const filterSlider = (index: number, value: number) => {
            arr[index] = value;

            this.value.price = arr;

            slider.noUiSlider?.set(arr);
        };

        inputs.forEach((element: HTMLInputElement, index: number) => {
            element.addEventListener('input', () => {
                filterSlider(index, +element.value);
            });
        });

        this.addListeners();

        slider.noUiSlider?.on('change', ((values: (number | string)[]) => {
            this.value[key] = values as number[];
            this.eventEmitter.emit('filterChange', this.value);
        }))
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
                this.eventEmitter.emit('filterChange', this.value);
            });

        const sortingSelect: HTMLSelectElement = form.elements.namedItem('sorting') as HTMLSelectElement;

        sortingSelect.addEventListener('change', () => {
            this.value.sorting = sortingSelect.value as Sotring;
            this.eventEmitter.emit('filterChange', this.value);
        });

        const brandCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('brandCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const cleaningTypeCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('cleaningTypeCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const colorCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('colorCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;

        this.addCheckboxListeners(brandCheckboxes, 'brand');
        this.addCheckboxListeners(cleaningTypeCheckboxes, 'cleaningType');
        this.addCheckboxListeners(colorCheckboxes, 'color');

        const inputIsPopular: HTMLInputElement = form.elements.namedItem('popular') as HTMLInputElement;

        inputIsPopular.addEventListener('change', () => {
            this.value.isPopular = inputIsPopular.checked;
            this.eventEmitter.emit('filterChange', this.value);
        })
    }

    private addCheckboxListeners(checkboxes: HTMLCollectionOf<HTMLInputElement>, key: 'brand' | 'cleaningType'| 'color') {
        Array.from<HTMLInputElement>(checkboxes).forEach((element: HTMLInputElement) => {
            element.addEventListener('change', () => {
                const set: Set<number> = new Set(this.value[key]);
                if (element.checked) {
                    set.add(+element.id);
                } else {
                    set.delete(+element.id);
                }

                this.value[key] = Array.from(set);
                this.eventEmitter.emit('filterChange', this.value);
            })
        })
    }
}