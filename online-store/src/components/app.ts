import "./style/style.scss";
import {Loader} from "../controllers/loader";
import {Catalog} from "./catalog/catalog";
import {Filter} from "./filters/filter";
import {EventEmitter} from "../controllers/event-emitter";
import {FilterValue} from "../models/filter-value.interface";

export class App {
    private eventEmitter: EventEmitter = new EventEmitter();
    private catalog: Catalog | undefined;
    private filter: Filter | undefined;

    constructor() {
        this.start();
    }

    public start(): void {
        new Loader((data) => {
            this.filter = new Filter();
            this.catalog = new Catalog(data);
            this.render();
        });

    }

    public render(): void {
        this.catalog?.render('.catalog');
        this.filter?.render('.filters');
        this.eventEmitter.on('filterChange', (data: Partial<FilterValue>) => console.log(data));
    }
}