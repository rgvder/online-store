import {ElementBuilder} from "../../controllers/element-builder";
import {templateFilter} from "./template-filter";
import {FilterValue, Sotring} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";
import {Loader} from "../../controllers/loader";
import {BaseObject} from "../../models/base.interface";
import {Brand} from "../../models/catalog.interface";

export class Filter {
    private value: FilterValue = {query: '', sorting: Sotring.Rating, brand: []};
    private eventEmitter: EventEmitter = new EventEmitter();
    private loader: Loader = new Loader();
    private filterBrand: Brand[] = [];

    constructor(initialValue?: FilterValue) {
        if (initialValue) {
            this.value = initialValue;
        }

        this.loader.load(`/source/brands.json`, (data: BaseObject[]) => {
            this.filterBrand = data as Brand[];
        })
    }

    public render(selector: string): void {
        const appWrapper: HTMLElement = document.querySelector(selector) as HTMLElement;

        const filterWrapper: HTMLElement = ElementBuilder.buildElement(
            templateFilter({query: 'query'})
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
    }
}