import "./style/style.scss";
import {Loader} from "../controllers/loader";
import {Catalog} from "./catalog/catalog";
import {Filter} from "./filters/filter";
import {EventEmitter} from "../controllers/event-emitter";
import {FilterValue} from "../models/filter-value.interface";
import {Item} from "../models/item.interface";
import {BaseObject} from "../models/base.interface";
import {Brand} from "../models/catalog.interface";

export class App {
    private eventEmitter: EventEmitter = new EventEmitter();
    private catalog: Catalog | undefined;
    private filter: Filter | undefined;
    private loader: Loader = new Loader();

    constructor() {
        this.start();
    }

    public start(): void {
        this.loader.load(`/source/items.json`, (items: BaseObject[]) => {
            this.loader.load(`/source/brands.json`, (brands: BaseObject[]) => {
                this.filter = new Filter(brands as Brand[]);
                this.catalog = new Catalog(items as Item[]);
                this.render();
            })
        });

    }

    public render(): void {
        this.catalog?.render('.catalog');
        this.filter?.render('.filters');
        this.eventEmitter.on('filterChange', (data: Partial<FilterValue>) => console.log(data));
    }
}