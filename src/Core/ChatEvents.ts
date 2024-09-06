/**
 * Event for when a chat message is submitted
 *
 * @param message The message that was submitted
 * @param userSent Whether the message was sent by the user
 */
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

/**
 * Event for when the textbar resizes
 *
 * @param height The new height of the textbar
 */
export class TextbarResizeEvent extends Event {
    public height: number;

    constructor(height: number) {
        super("TextbarResize", { bubbles: true, cancelable: true });
        this.height = height;
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: (event: TextbarResizeEvent) => void) {
        window.addEventListener("TextbarResize", (event: Event) => {
            callback(event as TextbarResizeEvent);
        });
    }

    public static RemoveListener(
        callback: (event: TextbarResizeEvent) => void,
    ) {
        window.removeEventListener("TextbarResize", (event: Event) => {
            callback(event as TextbarResizeEvent);
        });
    }
}

/**
 * Event for when the current chat is switched
 */
export class SwitchCurrentChatEvent extends Event {
    constructor() {
        super("SwitchCurrentChat", { bubbles: true, cancelable: true });
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: () => void) {
        window.addEventListener("SwitchCurrentChat", (event: Event) => {
            callback();
        });
    }

    public static RemoveListener(callback: () => void) {
        window.removeEventListener("SwitchCurrentChat", (event: Event) => {
            callback();
        });
    }
}

/**
 * Event for when a card is added
 */
export class AddCardEvent extends Event {
    constructor() {
        super("AddCard", { bubbles: true, cancelable: true });
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: () => void) {
        window.addEventListener("AddCard", (event: Event) => {
            callback();
        });
    }

    public static RemoveListener(callback: () => void) {
        window.removeEventListener("AddCard", (event: Event) => {
            callback();
        });
    }
}
