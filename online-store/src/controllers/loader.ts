import {Item} from "../models/item.interface";

export class Loader {

    constructor(callback: (data: Item[]) => void) {
        this.load(callback);
    }

    private static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private load(callback: (data: Item[]) => void): void {
        fetch(`/source/items.json`)
            .then((res: Response) => Loader.errorHandler(res))
            .then((res: Response) => res.json())
            .then((data: Item[]) => {
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}