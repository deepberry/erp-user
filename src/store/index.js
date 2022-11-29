import { createStore } from "vuex";

const Store = createStore({
    state: {
        power: {
            loading: true,
        },
    },
    mutations: {
        setPower: (state, data) => {
            let power = {};
            data.map((item) => {
                power[item] = true;
            });
            state.power = power;
        },
    },
});

export default Store;
