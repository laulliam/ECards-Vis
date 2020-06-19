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

  static get_f1_geoJson_data() {
    return axios.get('f1_geoJson_data');
  }

  static get_test_data() {
    return axios.get('test_data');
  }

  static get_meal_data() {
    return axios.get('meal_data');
  }

  static get_meal_dept_data() {
    return axios.get('meal_dept');
  }

  static get_meal_dept_pro() {
    return axios.get('meal_dept_pro');
  }

  static get_f1_iris_data() {
    return axios.get('f1_iris_data');
  }
  static get_f4_network_data() {
    return axios.get('f4_network_data');
  }

}
