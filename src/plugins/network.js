import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

let getStatus = async () => {
    return await Network.getStatus();
}

let objeto = {getStatus}

export default objeto;
