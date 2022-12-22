"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const seed = (client, input, opts) => {
    return new Promise(resolve => {
        client.seed(input, opts, torrent => {
            resolve(torrent.torrentFile);
        });
    });
};
exports.seed = seed;
