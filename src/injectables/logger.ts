import {Inject} from '../di/injector';

export class Logger {

    getType() {
        throw new Error("")
    }

    log(...args: any[]) {
        throw new Error("")
    }

}

export class ReverseLogger extends Logger {

    protected type = "console";

    getType(): string {
        return this.type;
    }

    log(...args: any[]) {

        console.log(args.map(arg => arg.split("").reverse().join("")));
    }
}

export class CustomLogger extends Logger {

    protected type = "line";

    constructor(@Inject("writer") private writer: (...args: any[]) => boolean,
                @Inject("logLevel") logLevel: string) {
        super();
    }

    getType(): string {
        return this.type;
    }

    log(...args: any[]) {

        args.forEach(this.writer);
    }
}
