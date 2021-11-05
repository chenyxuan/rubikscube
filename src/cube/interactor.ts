export class Interaction {
    type: string;
    x: number;
    y: number;
    constructor(type: string, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;
    }
}

export default class Interactor {
    dom: HTMLElement;
    callback: (action: Interaction) => void;
    target: EventTarget | null;
    last: Touch | null;

    touch = (event: TouchEvent): boolean => {
        const first = event.changedTouches[0];
        if (event.type === "touchstart") {
            this.target = event.target;
            if (this.last) {
                const action = new Interaction(
                    "touchend",
                    this.last.clientX - this.dom.getBoundingClientRect().left,
                    this.last.clientY - this.dom.getBoundingClientRect().top
                );
                this.callback(action);
            }
            this.last = first;
        }
        if (this.target !== this.dom || this.last?.identifier != first.identifier) {
            return false;
        }
        this.dom.tabIndex = 1;
        this.dom.focus();
        const action = new Interaction(
            event.type,
            first.clientX - this.dom.getBoundingClientRect().left,
            first.clientY - this.dom.getBoundingClientRect().top
        );
        this.callback(action);
        event.preventDefault();
        if (event.type === "touchend" || event.type === "touchcancel") {
            this.target = null;
        }
        return true;
    };

    mouse = (event: MouseEvent): boolean => {
        if (event.type === "mousedown") {
            this.target = event.target;
        }
        if (this.target !== this.dom) {
            return true;
        }
        this.dom.tabIndex = 1;
        this.dom.focus();
        const action = new Interaction(event.type, event.clientX, event.clientY);
        this.callback(action);
        if (event.type === "mouseup") {
            this.target = null;
        }
        return false;
    };

    constructor(dom: HTMLElement, callback: (action: Interaction) => void) {
        this.dom = dom;
        this.callback = callback;
        document.addEventListener("touchstart", this.touch);
        document.addEventListener("touchmove", this.touch);
        document.addEventListener("touchend", this.touch);
        document.addEventListener("touchcancel", this.touch);
        document.addEventListener("mousedown", this.mouse);
        document.addEventListener("mousemove", this.mouse);
        document.addEventListener("mouseup", this.mouse);
    }
}
