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

const responseHandler = async response => {

    try {
        console.log('ok')
    } catch (e) {
        console.log(e);
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

const errorHandlerResponse = error => {
    if(error.response){
        if (error.response.status == 401){
            window.location.href = '/login';
        }

    }
    return Promise.reject(error);
};

object.interceptors.request.use((request) => requestHandler(request), (error) => errorHandler(error));
object.interceptors.response.use((response) => responseHandler(response), (error) => errorHandlerResponse(error));


export default object;
