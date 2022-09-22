"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
async function registerCommands(client, dir = '') {
    const filePath = path_1.default.join(__dirname, dir);
    const files = await promises_1.default.readdir(filePath);
    for (const file of files) {
        console.log('File: ', file);
        const stat = await promises_1.default.lstat(path_1.default.join(filePath, file));
        if (stat.isDirectory())
            await registerCommands(client, path_1.default.join(dir, file));
        if (file.endsWith('.js') || file.endsWith('.ts')) {
            const Command = await Promise.resolve().then(() => __importStar(require(path_1.default.join(filePath, file)))); // importing the command
            const cmd = Command.default; // extracting with type
            console.log(cmd.name);
            client.slashCommands.set(cmd.name, cmd);
            console.log(`Registering ${cmd.name}`);
        }
    }
}
exports.registerCommands = registerCommands;
