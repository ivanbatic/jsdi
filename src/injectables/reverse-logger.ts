import {Logger} from './logger';

export class ReverseLogger extends Logger {

    protected type = "console";

    getType(): string {
        return this.type;
    }

    log(...args: any[]) {

        console.log(args.map(arg => arg.split("").reverse().join("")));
    }
}
