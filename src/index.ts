import "reflect-metadata";

import {App} from './app/app';
import {Injector} from './di/container';

const app = Injector.get(App);