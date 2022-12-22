/// <reference types="node" />
declare class Eueno {
    endpoint: string;
    nodeId: string;
    peerId: string;
    constructor(opts: {
        endpoint: string;
    });
    upload(input: Buffer | ArrayBuffer, opts: {
        bucketKey: string;
        endpoint: string;
    }, metadata: {
        filename: string;
        encryption: string;
        action: string;
        contentLength: number;
        contentType: string;
    }): Promise<string | number | Object>;
}
export default Eueno;
