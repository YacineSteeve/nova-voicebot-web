import Cookies from 'cookies-ts';
import type { Cookies as CookiesType } from 'cookies-ts';

const cookies = new Cookies();
cookies.config({expires: '30d'});

export type TCookies = CookiesType;

export default cookies;
