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
exports.requestSignUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const requestSignUrl = (opts, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.default)({
            method: 'post',
            url: `${opts.endpoint}${config_1.apiV1.requestUrlUpload}`,
            headers: {
                'x-api-project-key': opts.bucketKey,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "metadata": {
                    "content_length": metadata.contentLength,
                    "content_type": metadata.contentType,
                    "filename": metadata.filename,
                    "action": metadata.action,
                    "encryption": metadata.encryption,
                },
            }),
        });
        return result.data;
    }
    catch (e) {
        return `error request sign url ${e}`;
    }
});
exports.requestSignUrl = requestSignUrl;