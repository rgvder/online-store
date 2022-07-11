export class EventEmitter {
    private events: Map<string, ((data: Record<string, string | number | boolean>) => void)[]> = new Map();
    private static instance: EventEmitter;

    constructor() {
        if (EventEmitter.instance) {
            return EventEmitter.instance;
        }

        EventEmitter.instance = this;
        return this;
    }

    public on(name: string, listener: (data: Record<string, string | number | boolean>) => void) {
        if (!this.events.has(name)) {
            this.events.set(name, []);
        }

        this.events.get(name)?.push(listener);
    }

    public removeListener(name: string, listenerToRemove: () => void) {
        if (!this.events.has(name)) {
            return;
        }

        this.events.set(name, (this.events.get(name) ?? [])
            .filter((listener: (data: Record<string, string | number | boolean>) => void) => listener !== listenerToRemove));
    }


    public emit(name: string, data: Record<string, string | number | boolean>) {
        if (!this.events.has(name)) {
            return;
        }

        this.events.get(name)?.forEach((callback: (data: Record<string, string | number | boolean>) => void) => callback(data));
    }
}