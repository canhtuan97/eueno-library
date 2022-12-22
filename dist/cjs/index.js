"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webtorrent_hybrid_1 = __importDefault(require("webtorrent-hybrid"));
const client = new webtorrent_hybrid_1.default({ dht: false });
const config_1 = require("./config");
const requestSignUrl_1 = require("./requestSignUrl");
const uploadFile_1 = require("./uploadFile");
const uploadFileTorrent_1 = require("./uploadFileTorrent");
const seed_1 = require("./seed");
class Eueno {
    constructor(opts) {
        if (opts.endpoint === undefined) {
            throw new Error('end point invalid');
        }
        this.endpoint = opts.endpoint;
        this.nodeId = client.nodeId;
        this.peerId = client.peerId;
    }
    upload(input, opts, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
const upload = (input, opts, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    const isFilePath = typeof input === 'string';
    let file = input;
    if (isFilePath) {
        throw new Error("Only buffer file");
    }
    let signUrl = yield (0, requestSignUrl_1.requestSignUrl)(opts, metadata);
    if (signUrl.status !== 200) {
        throw new Error(`error request sign ${JSON.stringify(signUrl)}`);
    }
    else {
        opts.urlList = signUrl.data.webseed;
        opts.urlUploadFile = signUrl.data.url_upload_file;
        opts.urlUploadTorrent = signUrl.data.url_upload_torrent;
    }
    opts = yield getOpts(opts);
    let torrent = yield (0, seed_1.seed)(client, input, opts);
    const [a, b] = yield Promise.all([
        (0, uploadFile_1.uploadFile)(file, opts, metadata),
        (0, uploadFileTorrent_1.uploadFileTorrent)(torrent, opts)
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
});
function getOpts(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (opts.announce !== undefined) {
            opts.announce = opts.announce.cancat(config_1.announceList);
        }
        else {
            opts.announce = config_1.announceList;
        }
        opts.private = true;
        return opts;
    });
}
exports.default = Eueno;
