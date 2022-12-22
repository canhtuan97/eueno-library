export const seed = (
    client
    , input: Buffer | ArrayBuffer, opts: Object) => {
    return new Promise(resolve => {
        client.seed(input, opts, torrent => {
            resolve(torrent.torrentFile);
        });
    });
};
