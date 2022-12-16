const axios = require('axios');

const uploadFileTorrent = async (file, opts) => {
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

module.exports.uploadFileTorrent = uploadFileTorrent;
