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
exports.uploadFile = void 0;
const axios_1 = __importDefault(require("axios"));
const uploadFile = (file, opts, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.default)({
            method: 'put',
            url: opts.urlUploadFile,
            headers: {
                'Content-Type': `${metadata.contentType}`,
            },
            data: file,
        });
        return result.status;
    }
    catch (e) {
        return `error upload file to eueno ${e}`;
    }
});
exports.uploadFile = uploadFile;
