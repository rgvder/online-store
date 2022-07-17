export class Notification {
    private static instance: Notification;
    private active: string[] = [];

    constructor() {
        if (Notification.instance) {
            return Notification.instance;
        }

        Notification.instance = this;
        return this;
    }

    public render(text: string) {
        if (this.active.length) {
            return;
        }
        this.active = [text];

        const noticeWrapper: HTMLElement = document.querySelector('.notification') as HTMLElement;
        const notice: HTMLElement = document.querySelector('.notification__text') as HTMLElement;

        noticeWrapper.classList.add('notification_active');
        notice.innerText = this.active[0];

        setTimeout(() => {
            noticeWrapper.classList.remove('notification_active');
            notice.innerText = '';
            this.active = [];
        }, 3000)
    }
}