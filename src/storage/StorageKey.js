import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

let setKey = (key, value) => {
    return Storage.set({
        key,
        value
    });
}

let getkey = (key) => {
    return Storage.get({key});
}

let removeKey = async (key) => {
    await Storage.remove({key});
}

let object = {set: setKey, get: getkey, remove: removeKey};

export default object;
