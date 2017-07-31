import {App} from './app/app';
import {CustomLogger} from './injectables/custom-logger';
import {MockUserProvider} from './user/mock-user-provider';
import {UserProvider} from './user/user-provider';

export function writerFactory(level: string, userProvider) {
    let writerCounter = 0;
    return (dataToWrite) => {

        userProvider.fetch().then(user => {
            const writerID = ++writerCounter;
            console.log(`Writer ${writerID} (${level}):`, dataToWrite, user);
        });
    };
}

export const DI_CONFIG = {
    App: {useClass: App},
    Logger: {useClass: CustomLogger},
    writer: {
        useFactory: writerFactory,
        deps: ["logLevel", UserProvider]
    },
    logLevel: {
        useValue: "LOG_INFO"
    },
    UserProvider: {
        useClass: MockUserProvider
    }


};

