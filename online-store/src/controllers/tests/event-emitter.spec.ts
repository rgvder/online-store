import {EventEmitter} from "../event-emitter";

describe('event emitter', () => {
    let eventEmitter = new EventEmitter();

    test('eventEmitter.on', () => {
        eventEmitter.emit('test', {test: true});
        eventEmitter.on('test', (data) => {
            expect(data.test).toBeTruthy();
        })
    });

    test('eventEmitter.removeListener', () => {
        eventEmitter.removeListener('test', () => {
            expect('test').toBeTruthy();
        })
    });
});