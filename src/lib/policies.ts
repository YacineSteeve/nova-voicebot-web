import {useToast} from 'vue-toastification';
import {useReadFile} from '@/hooks/read-file';
import type {FileData} from '@/hooks/read-file';

export enum POLICIES_NAMES {
    PRIVACY_POLICY = 'privacy-policy',
    TERMS_OF_USE = 'terms-of-use',
    COOKIE_POLICY = 'cookie-policy',
}

export type Policy = FileData;
export type Policies = Record<POLICIES_NAMES, Policy>;

const toast = useToast();
const POLICIES: Policies = {} as Policies;

const FORMATTED_POLICIES_PATHS_MAP = {
    'privacy-policy': '/policies/formatted/privacy-policy.md',
    'terms-of-use': '/policies/formatted/terms-of-use.md',
    'cookie-policy': '/policies/formatted/cookie-policy.md',
}

export const RAW_POLICIES_PATHS_MAP = {
    'privacy-policy': '/policies/raw/privacy-policy.txt',
    'terms-of-use': '/policies/raw/terms-of-use.txt',
    'cookie-policy': '/policies/raw/cookie-policy.txt',
}

for (const [policyName, policyPath] of Object.entries(FORMATTED_POLICIES_PATHS_MAP)) {
    useReadFile(policyPath)
        .then(({data, error}) => {
            if (error) {
                toast.error(`Unable to load ${policyName} policy`);
                console.error(error);
                return;
            }

            POLICIES[policyName as POLICIES_NAMES] = data;
        })
        .catch(error => {
            toast.error(`Unable to load ${policyName} policy`);
            console.error(error);
            return;
        })
}

export default POLICIES;
