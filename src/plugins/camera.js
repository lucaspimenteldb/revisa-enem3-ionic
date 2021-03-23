import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

let takePicture = async (options) =>{
    let source = options.source === 0 ? CameraSource.Camera : CameraSource.Photos;
    const image = await Camera.getPhoto({
        quality: options.quality,
        height: options.height,
        preserveAspectRatio: options.preserveAspectRatio,
        allowEditing: options.allowEditing,
        resultType: options.uri ? CameraResultType.DataUrl : CameraResultType.Base64,
        source
    });

    return image;
}

let camera = {takePicture}

export default camera;
