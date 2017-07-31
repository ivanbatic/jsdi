export function DI<T>() {

    return function (targetConstructor: { new(...args: any[]) }) {

        return targetConstructor;
    }
}

export function Inject(token: string) {

    return function (host, un, argPos) {

        Reflect.defineMetadata(`di:token:${argPos}`, token, host);

    };
}