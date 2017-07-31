import {DI} from '../di/di';
import {Inject} from '../di/injector';
import {Logger} from '../injectables/logger';
import {UserProvider} from '../user/user-provider';

@DI()
export class App {

    constructor(public logger: Logger,
                private userProvider: UserProvider,
                @Inject("writer") writer) {

        logger.log("Hello World", "This is nice");

        userProvider.fetch().then(user =>{
            console.log("App user", user);
        })

    }
}