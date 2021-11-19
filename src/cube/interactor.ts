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
    doms: HTMLElement[] = [];
    callback: (action: Interaction) => void;
    target: EventTarget | null;
    last: Touch | null;

    notin(): boolean {
        for(const dom of this.doms) {
            if(this.target === dom) {
                return false;
            }
        }
        return true;
    }

    touch = (event: TouchEvent): boolean => {
        const first = event.changedTouches[0];
        if (event.type === "touchstart") {
            this.target = event.target;
            if (this.last) {
                const action = new Interaction(
                    "touchend",
                    this.last.clientX,
                    this.last.clientY
                );
                this.callback(action);
            }
            this.last = first;
        }
        if (this.notin() || this.last?.identifier != first.identifier) {
            return false;
        }
        const action = new Interaction(
            event.type,
            first.clientX,
            first.clientY
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
        if (this.notin()) {
            return true;
        }
        const action = new Interaction(event.type, event.clientX, event.clientY);
        this.callback(action);
        if (event.type === "mouseup") {
            this.target = null;
        }
        return false;
    };

    constructor(doms: (HTMLElement | null)[], callback: (action: Interaction) => void) {
        for(const dom of doms) {
            if(dom) {
                this.doms.push(dom);
            }
        }
        this.callback = callback;
        document.addEventListener("touchstart", this.touch);
        document.addEventListener("touchmove", this.touch);
        document.addEventListener("touchend", this.touch);
        document.addEventListener("touchcancel", this.touch);
        document.addEventListener("mousedown", this.mouse);
        document.addEventListener("mousemove", this.mouse);
        document.addEventListener("mouseup", this.mouse);

        document.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });
    }
}
