import {BaseObject} from "../models/base.interface";

export class Loader {

    private static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public load(url: string, callback: (data: BaseObject[]) => void): void {
        fetch(url)
            .then((res: Response) => Loader.errorHandler(res))
            .then((res: Response) => res.json())
            .then((data: BaseObject[]) => {
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}