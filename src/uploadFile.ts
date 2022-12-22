import axios from "axios";

export const uploadFile = async (file: Buffer | ArrayBuffer, opts: {
    urlUploadFile: string;
}, metadata: {
    contentType: string
}) => {
    try {
        const result = await axios({
            method: 'put',
            url: opts.urlUploadFile,
            headers: {
                'Content-Type': `${metadata.contentType}`,
            },
            data: file,
        });
        return result.status;
    } catch (e) {
        return `error upload file to eueno ${e}`;
    }

};

