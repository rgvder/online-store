import {ElementBuilder} from "../../controllers/element-builder";
import {templateCheckbox, templateFilter} from "./template-filter";
import {FilterValue, Sotring} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Loader} from "../../controllers/loader";
import {Brand} from "../../models/catalog.interface";

export class Filter {
    private value: FilterValue = {query: '', sorting: Sotring.Rating, brand: []};
    private eventEmitter: EventEmitter = new EventEmitter();
    private loader: Loader = new Loader();
    private filterBrand: Brand[] = [];

    constructor(brands: Brand[], initialValue?: FilterValue) {
        if (initialValue) {
            this.value = initialValue;
        }
        this.filterBrand = brands;
    }

    public render(selector: string): void {
        const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

        const filterWrapper: HTMLElement = ElementBuilder.buildElement(
            templateFilter({brandCheckbox: this.filterBrand.map((item: Brand) => templateCheckbox(item)).join('')})
        );

        appWrapper.prepend(filterWrapper);

        this.addListeners();
        this.eventEmitter.emit('filterChange', this.value);
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
    }
}