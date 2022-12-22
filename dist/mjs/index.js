import WebTorrent from 'webtorrent-hybrid';
const client = new WebTorrent({ dht: false });
import { announceList } from "./config";
import { requestSignUrl } from "./requestSignUrl";
import { uploadFile } from "./uploadFile";
import { uploadFileTorrent } from "./uploadFileTorrent";
import { seed } from "./seed";
class Eueno {
    endpoint;
    nodeId;
    peerId;
    constructor(opts) {
        if (opts.endpoint === undefined) {
            throw new Error('end point invalid');
        }
        this.endpoint = opts.endpoint;
        this.nodeId = client.nodeId;
        this.peerId = client.peerId;
    }
    async upload(input, opts, metadata) {
        if (metadata.contentLength === undefined) {
            throw new Error('contentLength invalid');
        }
        if (metadata.contentType === undefined) {
            throw new Error('contentType invalid');
        }
        if (metadata.filename === undefined) {
            throw new Error('filename invalid');
        }
        if (metadata.action === undefined) {
            throw new Error('action invalid');
        }
        if (metadata.encryption === undefined) {
            throw new Error('encryption invalid');
        }
        if (opts.bucketKey === undefined) {
            throw new Error('bucketKey invalid');
        }
        opts.endpoint = this.endpoint;
        return upload(input, opts, metadata);
    }
}
const upload = async (input, opts, metadata) => {
    const isFilePath = typeof input === 'string';
    let file = input;
    if (isFilePath) {
        throw new Error("Only buffer file");
    }
    let signUrl = await requestSignUrl(opts, metadata);
    if (signUrl.status !== 200) {
        throw new Error(`error request sign ${JSON.stringify(signUrl)}`);
    }
    else {
        opts.urlList = signUrl.data.webseed;
        opts.urlUploadFile = signUrl.data.url_upload_file;
        opts.urlUploadTorrent = signUrl.data.url_upload_torrent;
    }
    opts = await getOpts(opts);
    let torrent = await seed(client, input, opts);
    const [a, b] = await Promise.all([
        uploadFile(file, opts, metadata),
        uploadFileTorrent(torrent, opts)
    ]);
    if (a !== 200) {
        return `error upload file ${a}`;
    }
    else if (b !== 200) {
        return `error upload file torrent ${b}`;
    }
    return {
        torrent: signUrl.data.torrent_url,
        filename: signUrl.data.filename,
    };
};
async function getOpts(opts) {
    if (opts.announce !== undefined) {
        opts.announce = opts.announce.cancat(announceList);
    }
    else {
        opts.announce = announceList;
    }
    opts.private = true;
    return opts;
}
export default Eueno;
