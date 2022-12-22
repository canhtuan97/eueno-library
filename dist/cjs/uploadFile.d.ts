/// <reference types="node" />
export declare const uploadFile: (file: Buffer | ArrayBuffer, opts: {
    urlUploadFile: string;
}, metadata: {
    contentType: string;
}) => Promise<string | number>;
