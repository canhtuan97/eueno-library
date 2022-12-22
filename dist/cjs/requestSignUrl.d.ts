export declare const requestSignUrl: (opts: {
    endpoint: string;
    bucketKey: string;
}, metadata: {
    contentLength: string;
    contentType: string;
    filename: string;
    action: string;
    encryption: string;
}) => Promise<any>;
