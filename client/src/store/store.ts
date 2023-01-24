import { InjectionKey } from 'vue';
import {
    createStore,
    CommitOptions,
    useStore as baseUseStore,
    Store as BaseStore
} from 'vuex';
import { mutations } from '@/store/mutations';
import type { Mutations } from '@/store/mutations';
import { state } from '@/store/state';
import type { State } from '@/store/state';
import { getters } from '@/store/getters';
import type { Getters } from '@/store/getters';

export const store = createStore({
    state,
    getters,
    mutations
});

export const key: InjectionKey<BaseStore<State>> = Symbol();

export type Store = Omit<BaseStore<State>, 'getters' | 'commit'>
    & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}

export function useStore() {
    return baseUseStore(key);
}
