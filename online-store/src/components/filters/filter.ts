import {ElementBuilder} from "../../controllers/element-builder";
import {templateCheckbox, templateFilter, templateColorCheckbox, templateRangeSlider} from "./template-filter";
import {FilterValue, Sorting} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Option} from "../../models/catalog.interface";
import * as noUiSlider from 'nouislider';
import Choices from 'choices.js';
import {Item} from "../../models/item.interface";

export class Filter {
    private value: FilterValue = {
        query: '',
        sorting: Sorting.Rating,
        brand: [],
        price: [],
        cleaningType: [],
        color: [],
        suctionPower: [],
        isPopular: false
    };

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
        this.filterChange();

        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;
        const sortingSelect: HTMLSelectElement = form.elements.namedItem('sorting') as HTMLSelectElement;
        const choices = new Choices(sortingSelect, {
            searchEnabled: false,
            searchChoices: false,
            itemSelectText: '',
            position: 'auto',
            shouldSort: false,
        });

        choices.setChoiceByValue(this.value.sorting);

        const arrPrice: number[] = this.items.map((item: Item) => item.price);
        const arrSuctionPower: number[] = this.items.map((item: Item) => item.suctionPower);

        this.addRangeSlider('.price', arrPrice, 'price', this.value.price);
        this.addRangeSlider('.suction-power', arrSuctionPower, 'suctionPower', this.value.suctionPower);

    }

    private addRangeSlider(selector: string, arrayOfValues: number[], key: 'price' | 'suctionPower', savedValue: number[]): void {
        const sliderWrapper: noUiSlider.target = document.querySelector(selector) as noUiSlider.target;
        const slider: noUiSlider.target = sliderWrapper.querySelector('.slider__wrapper') as noUiSlider.target;
        const inputStart: HTMLInputElement = sliderWrapper.querySelector('.input-start') as HTMLInputElement;
        const inputEnd: HTMLInputElement = sliderWrapper.querySelector('.input-end') as HTMLInputElement;
        const inputs = [inputStart, inputEnd];
        const min: number = this.countMinValue(arrayOfValues);
        const max: number = this.countMaxValue(arrayOfValues);
        const start: number[] = savedValue?.length ? savedValue : [min, max];

        inputStart.setAttribute('placeholder', min.toString());
        inputEnd.setAttribute('placeholder', max.toString());

        noUiSlider.create(slider, {
            start: start,
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
            this.filterChange();
        }))
    }


    private addListeners(): void {
        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;
        const queryInput: HTMLInputElement = form.elements.namedItem('query') as HTMLInputElement;

        queryInput.value = this.value.query;

        queryInput
            ?.addEventListener("input", (e: Event) => {
                const input: HTMLInputElement = e.target as HTMLInputElement;

                if (this.value.query === input.value) {
                    return;
                }

                this.value.query = input.validity.valid ? input.value : '';
                this.filterChange();
            });

        document
            ?.querySelector<HTMLElement>("#queryButton")
            ?.addEventListener('click', () => {
                queryInput.value = '';
                this.value.query = '';
                this.filterChange();
            });

        const sortingSelect: HTMLSelectElement = form.elements.namedItem('sorting') as HTMLSelectElement;

        sortingSelect.addEventListener('change', () => {
            this.value.sorting = sortingSelect.value as Sorting;
            this.filterChange();
        });

        const cleaningTypeCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('cleaningTypeCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const brandCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('brandCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const colorCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('colorCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const inputIsPopular: HTMLInputElement = form.elements.namedItem('popular') as HTMLInputElement;

        this.addCheckboxListeners(brandCheckboxes, 'brand');
        this.addCheckboxListeners(cleaningTypeCheckboxes, 'cleaningType');
        this.addCheckboxListeners(colorCheckboxes, 'color');

        inputIsPopular.toggleAttribute('checked', this.value.isPopular);

        inputIsPopular.addEventListener('change', () => {
            this.value.isPopular = inputIsPopular.checked;
            this.filterChange();
        })

        const buttonClean: HTMLButtonElement = document.querySelector('#buttonClean') as HTMLButtonElement;
        const buttonReset: HTMLButtonElement = document.querySelector('#buttonReset') as HTMLButtonElement;

        buttonClean.addEventListener('click', () => {
            this.cleanFilters();
        })

        buttonReset.addEventListener('click', () => {
           this.reset();
            this.cleanFilters();
        })
    }

    private cleanFilters(): void {
        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;
        const brandCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('brandCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const cleaningTypeCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('cleaningTypeCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const colorCheckboxes: HTMLCollectionOf<HTMLInputElement> = (form.elements.namedItem('colorCheckbox') as HTMLFieldSetElement).elements as HTMLCollectionOf<HTMLInputElement>;
        const inputIsPopular: HTMLInputElement = form.elements.namedItem('popular') as HTMLInputElement;

        const arrPrice: number[] = this.items.map((item: Item) => item.price);
        const arrSuctionPower: number[] = this.items.map((item: Item) => item.suctionPower);
        const sliders: NodeListOf<noUiSlider.target> = document.querySelectorAll('.slider__wrapper');

        this.value.brand = [];
        this.value.cleaningType = [];
        this.value.color = [];
        this.value.isPopular = false;
        this.value.price = [this.countMinValue(arrPrice), this.countMaxValue(arrPrice)];
        this.value.suctionPower = [this.countMinValue(arrSuctionPower), this.countMaxValue(arrSuctionPower)];

        inputIsPopular.checked = false;
        this.resetCheckboxGroup(brandCheckboxes);
        this.resetCheckboxGroup(cleaningTypeCheckboxes);
        this.resetCheckboxGroup(colorCheckboxes);

        sliders.forEach((slider: noUiSlider.target) => {
            const min: number = slider.noUiSlider?.options.range.min as number;
            const max: number = slider.noUiSlider?.options.range.max as number;
            if (min && max) {
                slider.noUiSlider?.set([min, max]);
            }
        })

        this.filterChange();
    }

    private reset():void {
        const form: HTMLFormElement = document.forms.namedItem('filter') as HTMLFormElement;
        const queryInput: HTMLInputElement = form.elements.namedItem('query') as HTMLInputElement;

        queryInput.value = '';
        this.value.query = '';
        this.value.sorting = Sorting.Rating;

        localStorage.clear();
        this.eventEmitter.emit('reset', {});
    }

    private countMinValue(arrayValues: number[]): number {
        return Math.min(...arrayValues);
    }

    private countMaxValue(arrayValues: number[]): number {
        return Math.max(...arrayValues);
    }

    private resetCheckboxGroup(checkboxes: HTMLCollectionOf<HTMLInputElement>): void {
        Array.from<HTMLInputElement>(checkboxes).forEach((element: HTMLInputElement) => {
            element.checked = false;
        })
    }

    private addCheckboxListeners(checkboxes: HTMLCollectionOf<HTMLInputElement>, key: 'brand' | 'cleaningType'| 'color'): void {
        Array.from<HTMLInputElement>(checkboxes).forEach((element: HTMLInputElement) => {
            element.toggleAttribute('checked', this.value[key].includes(+element.id));


            element.addEventListener('change', () => {
                const set: Set<number> = new Set(this.value[key]);
                if (element.checked) {
                    set.add(+element.id);
                } else {
                    set.delete(+element.id);
                }

                this.value[key] = Array.from(set);
                this.filterChange();
            })
        })
    }

    private filterChange(): void {
        this.eventEmitter.emit('filterChange', this.value);
        localStorage.setItem('filterValue', JSON.stringify(this.value));
    }
}