/**
 * Created by hyylsw on 2017/6/14.
 */
import Vue from 'vue'
import axios from 'axios';
Vue.prototype.axios=axios;
const service=axios.create({
    // baseURL:'http://localhost:8088'
   baseURL:'http://192.168.0.254:8080',
});
export default  service;
