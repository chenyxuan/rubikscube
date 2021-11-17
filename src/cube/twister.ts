export class Twist {
    departure: number;
    arrival: number;
    durantion: number;

    elapsed: number;
    current: number;

    callback_func: ((angle : number) => boolean);
    
    constructor(depature : number, arrival : number, duration : number, callback_func : ((angle : number) => boolean)) {
        this.departure = depature;
        this.arrival = arrival;
        this.durantion = duration;
        this.callback_func = callback_func;

        this.elapsed = 0;
    }

    finish(): void {
        this.elapsed = this.durantion;
        this.current = this.arrival;
        this.callback();
    }

    // 1 - (1-x)^2
    update(): void {
        this.elapsed++;
        const frac = Math.min(Math.max(this.elapsed / this.durantion, 0), 1);
        this.current = frac == 1 ? this.arrival : (this.departure + (this.arrival - this.departure) * (1 - (1 - frac) * (1 - frac)));
    }

    callback(): boolean {
        return this.callback_func(this.current);
    }
}

export class Twister {
    twists: Twist[];

    constructor() {
        this.twists = [];
        this.loop();
    }

    loop(): void {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
    }

    update(): void {
        let cur = 0;
        let end = this.twists.length;
        while (cur < end) {
            this.twists[cur].update();
            if (this.twists[cur].callback()) {
                this.twists.splice(cur, 1);
                end--;
            } else {
                cur++;
            }
        }
    }

    finish(twist: Twist | undefined = undefined): void {
        if (twist) {
            for (let i = 0; i < this.twists.length; i++) {
                if (this.twists[i] == twist) {
                    twist.finish();
                    this.twists.splice(i, 1);
                    break;
                }
            }
        } else {
            const twists = this.twists.splice(0);
            for (const twist of twists) {
                twist.finish();
            }
        }
    }

    cancel(twist: Twist): void {
        for (let i = 0; i < this.twists.length; i++) {
            if (this.twists[i] == twist) {
                this.twists.splice(i, 1);
                break;
            }
        }
    }

    isTwisting():boolean {
        return this.twists.length != 0;
    }
}

export const twister = new Twister();
