import {Inject} from '../di/injector';
import {Logger} from './logger';

export class CustomLogger extends Logger {

    protected type = "line";

    constructor(@Inject("writer") private writer: (...args: any[]) => boolean,
                @Inject("logLevel") private logLevel: string,) {
        super();

    }

    getType(): string {
        return this.type;
    }

    log(...args: any[]) {

        args.forEach(this.writer);
    }
}