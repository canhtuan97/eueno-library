const createTorrent = require('create-torrent');

const createTorrentFile = (input, opts) => {
    return new Promise(resolve => {
        createTorrent(input, opts, async (err, torrent) => {
            resolve(torrent);
        });
    });
};

module.exports.createTorrentFile = createTorrentFile;
