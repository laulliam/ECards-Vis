import axios from "axios";

export default class DataManager {

  static get_f1_cluster_data() {
    return axios.get('f1_cluster_data');
  }

  static get_f1_scatter_data() {
    return axios.get('f1_scatter_data');
  }

  static get_f1_main_data() {
    return axios.get('f1_main_data');
  }

  static get_f1_timeline_data() {
    return axios.get('f1_timeline_data');
  }

  static get_f1_parallel_data() {
    return axios.get('f1_parallel_data');
  }

  static get_f1_mealRate_data() {
    return axios.get('f1_mealRate_data');
  }

  static get_f1_graph_data() {
    return axios.get('f1_graph_data');
  }

  static get_f4_network_data() {
    return axios.get('f4_network_data');
  }

}
