export function DI<T>() {

    return function (targetConstructor: { new(...args: any[]) }) {

        return targetConstructor;
    }
}
