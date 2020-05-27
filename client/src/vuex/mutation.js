const mutation = {
  f4_adjac(state, payload) {
    state.f4_adjac = JSON.parse(JSON.stringify(payload));
  },
  current_cluster(state, payload) {
    state.current_cluster = JSON.parse(JSON.stringify(payload));
  }
};

export default mutation;
