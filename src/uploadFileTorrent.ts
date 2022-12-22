import axios from "axios";

export const uploadFileTorrent = async (file: unknown, opts: { urlUploadTorrent: string }) => {
    try {
        const result = await axios({
            method: 'put',
            url: opts.urlUploadTorrent,
            headers: {
                'Content-Type': `application/x-bittorrent`,
            },
            data: file,
        });
        return result.status;
    } catch (e) {
        return `error upload file to eueno ${e}`;
    }

};
