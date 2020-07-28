const mutation = {
  status(state, payload) {
    state.status = JSON.parse(JSON.stringify(payload));
  },
  cf_value(state, payload) {
    state.cf_value = JSON.parse(JSON.stringify(payload));
  },
  df_value(state, payload) {
    state.df_value = JSON.parse(JSON.stringify(payload));
  },
  current_cluster(state, payload) {
    state.current_cluster = JSON.parse(JSON.stringify(payload));
  },
  current_canteen(state, payload) {
    state.current_canteen = JSON.parse(JSON.stringify(payload));
  },
  arrangeDinging(state, payload) {
    state.arrangeDinging = JSON.parse(JSON.stringify(payload));
  },
  adj_nodes(state, payload) {
    state.adj_nodes = JSON.parse(JSON.stringify(payload));
  }
};

export default mutation;
