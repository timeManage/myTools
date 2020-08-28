export const state = () => ({
    record: []
});
export const mutations = {
    setRecord(state, data) {
        state.record = data;
    },
    pushRecord(state, data) {
        const index = state.record.findIndex(value => {
            return value.bookLink === data.bookLink;
        });
        if (index>=0)
            state.record[index] = data;
        else
            state.record.push(data);
        window.localStorage.setItem('record', JSON.stringify(state.record));
    },
    getRecord(state) {
        window.localStorage.getItem();
    },
    removeRecord(state,index){
        state.record.splice(index,1);
        window.localStorage.setItem('record', JSON.stringify(state.record));
    }
};
export const actions = {
    setRead({commit}, data) {
        commit('setRecord', data);
    },
    pushRead({commit}, data) {
        commit('pushRecord', data);
    },
    getRead(commit) {

    },
    removeRead({commit},index){
        commit('removeRecord',index);
    }
};