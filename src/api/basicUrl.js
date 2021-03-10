import axios from "axios";
import config from '../env';

const object = axios.create({
    baseURL: config.api
})

export default object;
