import createTorrent from "create-torrent";

export const createTorrentFile = (input, opts) => {
    return new Promise(resolve => {
        createTorrent(input, opts, async (err, torrent) => {
            console.log(torrent);
            resolve(torrent);
        });
    });
};
