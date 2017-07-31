import {DI_CONFIG} from '../di-config';
import {TokenNotFoundError} from './errors';
import {DIType} from './type';


class Container {
    private registry = new Map<Object, DIType>();


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
            if (tokenValue.__cachedInstance) {
                return tokenValue.__cachedInstance;
            }

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
            const instance = new val(...callArgs);

            tokenValue.__cachedInstance = instance;

            return instance;
        }

        if (tokenValue.useFactory) {
            const factory     = tokenValue.useFactory;
            const factoryDeps = (tokenValue.deps || []).map(dep => Injector.get(dep));

            return new factory(...factoryDeps);
        }
    }
}

export const Injector = new Container(DI_CONFIG);