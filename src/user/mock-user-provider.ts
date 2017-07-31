import {UserProvider} from './user-provider';

export class MockUserProvider extends UserProvider {

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    firstName: "Bob",
                    lastName: "Johnson"
                });
            }, 2000);
        })
    }
}