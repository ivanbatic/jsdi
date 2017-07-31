import {Logger} from './logger';

export class ReverseLogger extends Logger {

    log(...args: any[]) {

        console.log(args.map(arg => arg.split("").reverse().join("")));
    }
}
