import {ElementBuilder} from "../../controllers/element-builder";
import {templateFilter} from "./template-filter";
import {FilterValue} from "../../models/filter-value.interface";
import {EventEmitter} from "../../controllers/event-emitter";

export class Filter {
    private value: FilterValue = {query: ''};
    private eventEmitter: EventEmitter = new EventEmitter();

    constructor(initialValue?: FilterValue) {
        if (initialValue) {
            this.value = initialValue;
        }
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
        const queryInput: HTMLInputElement = document.querySelector('#query') as HTMLInputElement;

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
    }
}