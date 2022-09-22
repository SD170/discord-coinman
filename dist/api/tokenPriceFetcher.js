"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moralisTokenPriceFetcher = void 0;
const moralis_1 = __importDefault(require("moralis"));
const evm_utils_1 = require("@moralisweb3/evm-utils");
const currencyFormatter_1 = require("../utils/currencyFormatter");
const moralisTokenPriceFetcher = async (tokenDetail) => {
    const { MORALIS_API_KEY } = process.env;
    const chain = evm_utils_1.EvmChain.ETHEREUM;
    const { address } = tokenDetail;
    await moralis_1.default.start({
        apiKey: MORALIS_API_KEY,
    });
    const response = await moralis_1.default.EvmApi.token.getTokenPrice({
        address,
        // @ts-ignore
        chain,
    });
    // console.log(response.result);
    const formattedPrice = currencyFormatter_1.usdFormatter.format(response.result.usdPrice);
    return formattedPrice;
};
exports.moralisTokenPriceFetcher = moralisTokenPriceFetcher;
