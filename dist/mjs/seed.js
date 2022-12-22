export const seed = (client, input, opts) => {
    return new Promise(resolve => {
        client.seed(input, opts, torrent => {
            resolve(torrent.torrentFile);
        });
    });
};
