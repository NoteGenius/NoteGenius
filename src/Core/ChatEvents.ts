/**
 * Event for general chat events to force a rerender
 *
 * rerenders the chat
 */
export class ChatEvent extends Event {
    constructor() {
        super("ChatEvent", { bubbles: true, cancelable: true });
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: () => void) {
        window.addEventListener("ChatEvent", (event: Event) => {
            callback();
        });
    }

    public static RemoveListener(callback: () => void) {
        window.removeEventListener("ChatEvent", (event: Event) => {
            callback();
        });
    }
}

/**
 * Event for when the textbar resizes
 *
 * rerenders the chat
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
 * Event for Recent history events
 * When the recent history cards are changed the recent history will be rerendered
 */
export class RecentHistoryEvent extends Event {
    constructor() {
        super("RecentHistoryEvent", { bubbles: true, cancelable: true });
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: () => void) {
        window.addEventListener("RecentHistoryEvent", (event: Event) => {
            callback();
        });
    }

    public static RemoveListener(callback: () => void) {
        window.removeEventListener("RecentHistoryEvent", (event: Event) => {
            callback();
        });
    }
}

/**
 * Event for when the sources panel is opened
 *
 * opens the sources panel
 */
export class OpenSourcesPanelEvent extends Event {
    constructor() {
        super("OpenSourcesPanel", { bubbles: true, cancelable: true });
    }

    public Dispatch() {
        window.dispatchEvent(this);
    }

    public static Listen(callback: () => void) {
        window.addEventListener("OpenSourcesPanel", (event: Event) => {
            callback();
        });
    }

    public static RemoveListener(callback: () => void) {
        window.removeEventListener("OpenSourcesPanel", (event: Event) => {
            callback();
        });
    }
}
