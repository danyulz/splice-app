import { TemporaryDirectoryPath } from 'react-native-fs';
// import { FFmpegKit } from 'ffmpeg-kit-react-native';

const IOSVideoConverter = async (uri: string) => {

    // const outputVideoName = `${uri}.mp4`;
    // const outputVideoUri = `file://${TemporaryDirectoryPath}/${outputVideoName}`;

    // try {
    //     await FFmpegKit.execute(`-y -i ${uri} -c copy ${outputVideoUri}`);
    // } catch (e) {
    //     throw new Error('Failed to convert the video');
    // }

    // return outputVideoUri;
}

export default IOSVideoConverter;