import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

let open = (url) => {
    return Browser.open({url});
};

let browser = {open};

export default browser;
