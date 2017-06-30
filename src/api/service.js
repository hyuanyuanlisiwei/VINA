/**
 * Created by hyylsw on 2017/6/14.
 */
import Vue from 'vue'
import axios from 'axios';
Vue.prototype.axios=axios;
const service=axios.create({
    baseURL:'http://192.168.1.123:8080'
    // baseURL:'http://test.dsp.f2time.com'
    // baseURL:'http://192.168.1.141'
});
export default  service;
