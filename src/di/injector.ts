export function Inject(token: string) {

    return function (host, un, argPos) {

        Reflect.defineMetadata(`di:token:${argPos}`, token, host);

    };
}