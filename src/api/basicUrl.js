import axios from "axios";
import config from '../env';

let xyz_global = window.localStorage.getItem('_cap_xyz') ? JSON.parse(window.localStorage.getItem('_cap_xyz')).xyz_completo : '';

const object = axios.create({
    baseURL: config.api,
    headers: {Authorization: xyz_global}
})

export default object;
