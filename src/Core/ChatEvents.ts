export class SubmitChatMessageEvent extends Event {
    public message: string;
    public userSent: boolean;

    constructor(message: string, userSent: boolean) {
        super("SubmitChatMessage", { bubbles: true, cancelable: true });
        this.message = message;
        this.userSent = userSent;
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: (event: SubmitChatMessageEvent) => void) {
        window.addEventListener("SubmitChatMessage", (event: Event) => {
            callback(event as SubmitChatMessageEvent);
        });
    }

    public static RemoveListener(
        callback: (event: SubmitChatMessageEvent) => void,
    ) {
        window.removeEventListener("SubmitChatMessage", (event: Event) => {
            callback(event as SubmitChatMessageEvent);
        });
    }
}
