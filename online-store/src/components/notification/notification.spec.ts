import {Notification} from "./notification";

describe('notification', () => {
    document.body.innerHTML = `
  <div class="notification">
    <span class="notification__text"></span>
  </div>`

    const span: HTMLElement = document.querySelector('.notification__text') as HTMLElement;
    const div: HTMLElement = document.querySelector('.notification') as HTMLElement;
    const notification = new Notification();

    test('notification', () => {
        notification.render('test');
        expect(span?.innerText).toBe('test');
    });

    test('style notification_active', () => {
        expect(div.classList.contains('notification_active')).toBeTruthy();
    });
});