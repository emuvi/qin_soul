import { Nature } from "./qin-type";

export enum QinConstants {
    DEV_TOOLS = "DevTools",
    QIN_BASES = "QinBases",
    QIN_BASE_SELECTED = "QinBaseSelected",
    QIN_SETUP = "QinSetup",
    LANG_PT_BR = "pt-BR",
}

function getLocation() {
    return window.location.href;
}

function isLocalHost() {
    let location = getLocation();
    let start = location.indexOf("://");
    if (start == -1) {
        start = 0;
    } else {
        start += 3;
    }
    location = location.substring(start);
    return location.indexOf("localhost") === 0 || location.indexOf("127.0.0.1") === 0;
}

function getSeparator(ofPath: string): string {
    let result = "/";
    if (ofPath && ofPath.indexOf("\\") > -1) {
        result = "\\";
    }
    return result;
}

function getPathJoin(pathA: string, pathB: string): string {
    if (pathA == null || pathA == undefined) {
        pathA = "";
    }
    if (pathB == null || pathB == undefined) {
        pathB = "";
    }
    if (pathA.length == 0) {
        return pathB;
    } else if (pathB.length == 0) {
        return pathA;
    } else {
        let union = "/";
        if (pathA.indexOf("\\") > -1 || pathB.indexOf("\\") > -1) {
            union = "\\";
        }
        let pathAEnd = pathA.substring(pathA.length - 1, pathA.length);
        let pathBStart = pathB.substring(0, 1);
        if (pathAEnd == union || pathBStart == union) {
            union = "";
        }
        return pathA + union + pathB;
    }
}

function getParent(path: string): string {
    if (path) {
        let separator = getSeparator(path);
        let last = path.lastIndexOf(separator);
        if (last > -1) {
            return path.substring(0, last);
        }
    }
    return "";
}

function getStem(path: string): string {
    if (path) {
        let separator = getSeparator(path);
        let last = path.lastIndexOf(separator);
        if (last > -1) {
            return path.substring(last + 1);
        }
    }
    return "";
}

function getFileExtension(name: string): string {
    let position = name.lastIndexOf(".");
    if (position > -1) {
        return name.substring(position + 1);
    } else {
        return "";
    }
}

const appsExtensions = ["htm", "html", "css", "js", "jsx", "ts", "tsx", "phtml"];

function isFileApp(extension: string): boolean {
    return appsExtensions.indexOf(extension) > -1;
}

const cmdsExtensions = ["h", "c", "hpp", "cpp", "rs", "jl", "cs", "csproj", "fs", "ml", "fsi", "mli", "fsx", "fsscript", "java", "gy", "gvy", "groovy", "sc", "scala", "clj", "py", "ruby", "php", "phtml"];

function isFileCmd(extension: string): boolean {
    return cmdsExtensions.indexOf(extension) > -1;
}

const execExtensions = ["exe", "jar", "com", "bat", "sh"];

function isFileExec(extension: string): boolean {
    return execExtensions.indexOf(extension) > -1;
}

const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

function isFileImage(extension: string): boolean {
    return imageExtensions.indexOf(extension) > -1;
}

const vectorExtensions = ["svg"];

function isFileVector(extension: string): boolean {
    return vectorExtensions.indexOf(extension) > -1;
}

const movieExtensions = ["avi", "mp4"];

function isFileMovie(extension: string): boolean {
    return movieExtensions.indexOf(extension) > -1;
}

const musicExtensions = ["wav", "mp3"];

function isFileMusic(extension: string): boolean {
    return musicExtensions.indexOf(extension) > -1;
}

const zippedExtensions = ["zip", "rar", "7z", "tar", "gz"];

function isFileZipped(extension: string): boolean {
    return zippedExtensions.indexOf(extension) > -1;
}

function parseBit(value: any) {
  return value ? 1 : 0;
}

function parseBool(value: any) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    let lower = value.trim().toLowerCase();
    return ["true", "1", "yes", "y"].indexOf(lower) >= 0;
  }
  return Boolean(value);
}

function parseByte(value: any) {
  let num = Number(value) || 0;
  num = Math.trunc(num);
  if (num < -128) return -128;
  if (num > 127) return 127;
  return num;
}

function parseTiny(value: any) {
  return parseByte(value);
}

function parseSmall(value: any) {
  let num = Number(value) || 0;
  num = Math.trunc(num);
  if (num < -32768) return -32768;
  if (num > 32767) return 32767;
  return num;
}

function parseInt32(value: any) {
  let num = Number(value) || 0;
  num = Math.trunc(num);
  if (num < -2147483648) return -2147483648;
  if (num > 2147483647) return 2147483647;
  return num;
}

function parseLong(value: any) {
  let num = Number(value) || 0;
  num = Math.trunc(num);
  if (num < -9007199254740991) return -9007199254740991;
  if (num > 9007199254740991) return 9007199254740991;
  return num;
}

function parseSerial(value: any) {
  return parseInt32(value);
}

function parseBigSerial(value: any) {
  return parseLong(value);
}

function parseFloat32(value: any) {
  let num = Number(value) || 0;
  if (num < -3.4028235e38) return -3.4028235e38;
  if (num > 3.4028235e38) return 3.4028235e38;
  return num;
}

function parseReal(value: any) {
  return parseFloat32(value);
}

function parseDouble(value: any) {
  let num = Number(value) || 0;
  if (num < -1.7976931348623157e308) return -1.7976931348623157e308;
  if (num > 1.7976931348623157e308) return 1.7976931348623157e308;
  return num;
}

function parseNumeric(value: any) {
  let num = Number(value);
  return isNaN(num) ? 0 : num;
}

function parseBigNumeric(value: any) {
  let num = Number(value);
  return isNaN(num) ? 0 : num;
}

function parseChar(value: any) {
  let str = String(value || "").trim();
  return str.charAt(0) || "\0";
}

function parseChars(value: any) {
  return String(value || "");
}

function parseDate(value: any) {
  let d = new Date(value);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function parseTime(value: any) {
  if (typeof value === "string") return value;
  let d = new Date(value);
  return isNaN(d.getTime()) ? "00:00:00" : d.toTimeString().split(" ")[0];
}

function parseDateTime(value: any) {
  let d = new Date(value);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function parseTimestamp(value: any) {
  let d = new Date(value);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function parseBytes(value: any) {
  if (value instanceof Uint8Array) return value;
  if (Array.isArray(value)) return new Uint8Array(value.map(function(v){return Number(v)||0;}));
  if (typeof value === "string") return new Uint8Array([].map.call(value,function(c){return c.charCodeAt(0);}));
  return new Uint8Array(0);
}

function parseBlob(value: any) {
  if (value instanceof Uint8Array || value instanceof ArrayBuffer) return value;
  return parseBytes(value);
}

function parseText(value: any) {
  return String(value || "");
}

function parseObject(value: any) {
  return JSON.parse(String(value || "{}"));
}

function parseValued(type: Nature, data: any): any {
    switch (type) {
        case Nature.BIT:
            return parseBit(data);
        case Nature.BOOL:
            return parseBool(data);
        case Nature.BYTE:
            return parseByte(data);
        case Nature.TINY:
            return parseTiny(data);
        case Nature.SMALL:
            return parseSmall(data);
        case Nature.INT:
            return parseInt32(data);
            case Nature.SERIAL:
            return parseSerial(data);
        case Nature.LONG:
            return parseLong(data);
        case Nature.BIG_SERIAL:
            return parseBigSerial(data);
        case Nature.FLOAT:
            return parseFloat32(data);
        case Nature.REAL:
            return parseReal(data);
        case Nature.DOUBLE:
            return parseDouble(data);
        case Nature.NUMERIC:
            return parseNumeric(data);
        case Nature.BIG_NUMERIC:
            return parseBigNumeric(data);
        case Nature.CHAR:
            return parseChar(data);
        case Nature.CHARS:
            return parseChars(data);
        case Nature.DATE:
            return parseDate(data);
        case Nature.TIME:
            return parseTime(data);
        case Nature.DATE_TIME:
            return parseDateTime(data);
        case Nature.TIMESTAMP:
            return parseTimestamp(data);
        case Nature.BYTES:
            return parseBytes(data);
        case Nature.BLOB:
            return parseBlob(data);
        case Nature.TEXT:
            return parseText(data);
        case Nature.OBJECT:
            return parseObject(data);
        default:
            return data;
    }
}

export const QinFoot = {
    getLocation,
    isLocalHost,
    getSeparator,
    getPathJoin,
    getParent,
    getStem,
    getFileExtension,
    isFileApp,
    isFileCmd,
    isFileExec,
    isFileImage,
    isFileVector,
    isFileMovie,
    isFileMusic,
    isFileZipped,
    parseBit,
    parseBool,
    parseByte,
    parseTiny,
    parseSmall,
    parseInt32,
    parseLong,
    parseSerial,
    parseBigSerial,
    parseFloat32,
    parseReal,
    parseDouble,
    parseNumeric,
    parseBigNumeric,
    parseChar,
    parseChars,
    parseDate,
    parseTime,
    parseDateTime,
    parseTimestamp,
    parseBytes,
    parseBlob,
    parseText,
    parseValued
};
