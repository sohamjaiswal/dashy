import { Action, action, createStore, createTypedHooks } from 'easy-peasy';

interface IGlobalStore {
    loading: boolean;
    toggleLoading: Action<IGlobalStore>;
    setLoading: Action<IGlobalStore, boolean>;
}

export const globalStore = createStore<IGlobalStore>({
    loading: false,
    toggleLoading: action((state) => {
        state.loading = !state.loading;
    }),
    setLoading: action((state, payload) => {
        state.loading = payload;
    }),
});

const typedGlobalHooks = createTypedHooks<IGlobalStore>();

export const useGlobalStoreActions = typedGlobalHooks.useStoreActions;
export const useGlobalStoreDispatch = typedGlobalHooks.useStoreDispatch;
export const useGlobalStoreState = typedGlobalHooks.useStoreState;
