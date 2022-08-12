import { RNS3 } from '@onytgvx/react-native-aws3';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import bucket_config from '../../aws/bucket_config';
import { MediaFile } from '../../interfaces';
import * as FileSystem from "expo-file-system"
import { zip } from 'react-native-zip-archive'
import { Dispatch, SetStateAction } from 'react';


const handleUploadMedia = async (data: any, setProgress: Dispatch<SetStateAction<number>>, debug: boolean = true): Promise<void>  => {

    if (debug) console.log("++ ")
    if (debug) console.log("++ handleUploadMedia...")
    if (debug) console.log("++ ")
    if (debug) console.log("++ ", data)

    const id = uuid()
    const type =
        data.type == "video" ? "mov" :
            data.type == "image" ? "jpg" :
                ""

    if (debug && type == "") console.log('++ ERROR: Unknown media type:', data.type);
    if (type == "") return

    const targetPath =  `${FileSystem.documentDirectory}${id}.zip`
    const sourcePath = data.uri

    console.log(targetPath)
    // zip(sourcePath, targetPath)
    //     .then((path) => {
    //         console.log(`zip completed at ${path}`)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })

    const file: MediaFile = {
        uri: data.uri,
        type: type,
        name: id,
    }

    const metadata = {
        duration: data.duration,
        height: data.height,
        width: data.width,
        type: data.type
    }

    RNS3.put(file, bucket_config(type, metadata))
        .progress((e: any) => setProgress(e.loaded / e.total))
        .then((response: any) => {
            if (debug) console.log('++ SUCCESS: ', response.body)
            if (debug) console.log('++')
        }).catch((error: any) => {
            if (debug) console.log('++ ERROR:', error)
            if (debug) console.log('++')
        });
}

export default handleUploadMedia;