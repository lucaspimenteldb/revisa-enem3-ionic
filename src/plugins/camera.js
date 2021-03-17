import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

let takePicture = async (options) =>{
    const image = await Camera.getPhoto({
        quality: options.quality,
        height: options.height,
        preserveAspectRatio: options.preserveAspectRatio,
        allowEditing: options.allowEditing,
        resultType: options.uri ? CameraResultType.DataUrl : CameraResultType.Base64
    });

    return image;
}

let camera = {takePicture}

export default camera;
