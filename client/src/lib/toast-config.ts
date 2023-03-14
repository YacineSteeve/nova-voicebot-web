import {POSITION, TYPE} from 'vue-toastification';
import type {PluginOptions} from 'vue-toastification';

const toastOptions: PluginOptions = {
    maxToasts: 5,
    toastDefaults: {
        [TYPE.DEFAULT]: {
            position: POSITION.TOP_CENTER,
        },
        [TYPE.ERROR]: {
            position: POSITION.TOP_CENTER,
        }
    },
    shareAppContext: true,
};

export default toastOptions;
