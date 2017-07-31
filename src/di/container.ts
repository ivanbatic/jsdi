import {DI_CONFIG} from '../di-config';
import {TokenNotFoundError} from './errors';

export type Token = Object;

export type DIType = {
    useValue?: any;
    useClass?: any;
    useFactory?: any;
    deps?: any[];
};

class Container {
    private registry = new Map<Token, DIType>();


    constructor(diConfig: Object) {
        for (let token in diConfig) {

            this.registry.set(token, diConfig[token]);
        }
    }

    get (token: any) {

        if (typeof token === "function") {
            token = token.name;
        }

        if (!this.registry.has(token)) {
            throw new TokenNotFoundError(`Token ${token} does not exist in the registry.`);
        }

        const tokenValue = this.registry.get(token);

        if (tokenValue.useValue !== undefined) {
            return tokenValue.useValue;
        }

        if (tokenValue.useClass) {
            const val             = tokenValue.useClass;
            const hostConstructor = val.prototype.constructor;


            const paramTypes = Reflect.getMetadata("design:paramtypes", hostConstructor) || [];
            const metaKeys   = Reflect.getMetadataKeys(hostConstructor);

            const callArgs = paramTypes.map((fn, i) => {

                const argTokenName = `di:token:${i}`;

                if (metaKeys.indexOf(argTokenName) !== -1) {
                    return Injector.get(Reflect.getMetadata(argTokenName, hostConstructor))
                }

                return Injector.get(fn.name);
            });

            return new val(...callArgs);
        }

        if (tokenValue.useFactory) {
            const factory     = tokenValue.useFactory;
            const factoryDeps = (tokenValue.deps || []).map(dep => Injector.get(dep));

            return new factory(...factoryDeps);
        }
    }
}

export const Injector = new Container(DI_CONFIG);