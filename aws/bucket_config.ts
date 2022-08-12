import { aws } from "./keys"


const bucket_config = (media_type: "mov" | "jpg", metadata: object) => {

    const config = {
        keyPrefix: `public/${media_type}/`,
        bucket: 'splice-media-dump',
        region: 'us-west-1',
        accessKey: aws.accessKey,
        secretKey: aws.secretKey,
        successActionStatus: 201,
        metadata: metadata
    }
    return config;
}

export default bucket_config;
