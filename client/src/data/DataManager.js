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

  static get_f1_mealRate_data(cluster) {
    return axios.get('f1_mealRate_data',{params:{
        cluster:cluster
      }});
  }

  static get_f1_graph_data(name) {
    return axios.get('f1_graph_data',{
      params:{
        name:name
      }
    });
  }

  static get_f1_geoJson_data() {
    return axios.get('f1_geoJson_data');
  }

  static get_meal_default() {
    return axios.get('meal_dept_default');
  }

  static get_meal_quarter() {
    return axios.get('meal_dept_quarter');
  }

  static get_meal_half() {
    return axios.get('meal_dept_half');
  }

  static get_meal_dept_default() {
    return axios.get('dept_20min_default');
  }

  static get_meal_dept_quarter() {
    return axios.get('dept_20min_quarter');
  }

  static get_meal_dept_half() {
    return axios.get('dept_20min_half');
  }

  static get_network_data(all_value) {
    return axios.get('network_data',{params:{
        cf_min:all_value.cf_value[0],
        cf_max:all_value.cf_value[1],
        cs_min:all_value.cs_value[0],
        cs_max:all_value.cs_value[1],
      }});
  }

  static get_meal_prefer(cluster) {
    return axios.get('meal_info',{
      params:{
        cluster:cluster
      }
    });
  }

  static get_meal_timeline(Dept) {
    return axios.get('meal_dept_timeline',{
      params:{
        Dept:Dept
      }
    });
  }

  static get_meal_timeline_pro(Dept) {
    return axios.get('meal_dept_timeline_pro',{
      params:{
        Dept:Dept
      }
    });
  }

  static get_orderliness_detail(card_id) {
    return axios.get('orderliness_detail',{
      params:{
        card_id:card_id
      }
    });
  }

  static get_dept07_graph() {
    return axios.get('dept07_graph');
  }

  static get_freq_words_data() {
    return axios.get('freq_words_data');
  }

}
