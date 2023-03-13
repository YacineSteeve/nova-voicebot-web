import Cookies from 'cookies-ts';
import type { CookiesOption } from 'cookies-ts';

class CustomCookies extends Cookies {
    constructor() {
        super();
        this.config({expires: '30d'});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(key: string, value: any, option?: CookiesOption): this {
        const allowedCookies = super.get('nova-use-cookies');

        if (key === 'nova-use-cookies' || (allowedCookies && allowedCookies.includes(key))) {
            return super.set(key, value, option);
        }

        return this;
    }
}

const cookies = new CustomCookies();

export default cookies;
