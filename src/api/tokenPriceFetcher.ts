import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import { usdFormatter } from '../utils/currencyFormatter';


export const moralisTokenPriceFetcher = async (tokenDetail: eachTokenDetailsType): Promise<string> => {
    const { MORALIS_API_KEY } = process.env;
    const chain = EvmChain.ETHEREUM;

    const { address } = tokenDetail;

    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        // @ts-ignore
        chain,
    });
    // console.log(response.result);

    const formattedPrice = usdFormatter.format(response.result.usdPrice);

    return formattedPrice;

}
