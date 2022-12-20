import axios from "axios";
import {apiV1} from "./config.js";

export const requestSignUrl = async (opts, metadata) => {
    try {
        const result = await axios({
            method: 'post',
            url: `${opts.endpoint}${apiV1.requestUrlUpload}`,
            headers: {
                'x-api-project-key': opts.bucketKey,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "metadata": {
                    "content_length": metadata.contentLength,
                    "content_type": metadata.contentType,
                    "filename": metadata.filename,
                    "action": metadata.action,
                    "encryption": metadata.encryption,
                },
            }),
        });
        return result.data;
    } catch (e) {
        return `error request sign url ${e}`;
    }
};

