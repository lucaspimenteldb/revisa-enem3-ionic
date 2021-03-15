import axios from "axios";
import config from '../env';
import storage from '../storage/StorageKey';

const object = axios.create({
    baseURL: config.api,
})

const requestHandler = async request => {

    try {
        let xyz = await storage.get('xyz');
        if (xyz) {
            xyz = JSON.parse(xyz.value);
           request.headers.Authorization = xyz.xyz_completo;
        }
    } catch (e) {
        console.log(e);
    }

    return request;
};

const errorHandler = error => {
    return Promise.reject(error);
};

object.interceptors.request.use((request) => requestHandler(request), (error) => errorHandler(error));


export default object;
