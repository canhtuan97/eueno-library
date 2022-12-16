const axios = require('axios');

const uploadFile = async (file, opts, metadata) => {
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

module.exports.uploadFile = uploadFile;
