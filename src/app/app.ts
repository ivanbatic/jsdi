import {DI, Inject} from '../di/injector';
import {Logger} from '../injectables/logger';

@DI()
export class App {

    constructor(public logger: Logger, @Inject("writer") writer) {

        logger.log("Hello World", "This is nice");
        writer("Foo Boo");
    }

    run() {


    }
}