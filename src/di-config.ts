import {App} from './app/app';
import {CustomLogger} from './injectables/logger';

export function writerFactory(level: string) {
    let writerCounter = 0;
    return (dataToWrite) => {
        const writerID = ++writerCounter;
        console.log(`Writer ${writerID} (${level}):`, dataToWrite);
    };
}

export const DI_CONFIG = {
    App: {useClass: App},
    Logger: {useClass: CustomLogger},
    writer: {
        useFactory: writerFactory,
        deps: ["logLevel"]
    },
    logLevel: {
        useValue: "LOG_INFO"
    }


};

