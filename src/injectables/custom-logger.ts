import {Inject} from '../di/injector';
import {Logger} from './logger';

export class CustomLogger extends Logger {

    constructor(@Inject("writer") private writer: (...args: any[]) => boolean,
                @Inject("logLevel") private logLevel: string,) {
        super();

    }

    log(...args: any[]) {

        args.forEach(this.writer);
    }
}