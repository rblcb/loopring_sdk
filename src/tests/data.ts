import {
  AmmpoolAPI,
  ExchangeAPI,
  UserAPI,
  WalletAPI,
  WsAPI,
  NFTAPI,
  DelegateAPI,
  GlobalAPI,
  WhitelistedUserAPI,
} from "../api";
import { ChainId } from "../defs";
import Web3 from "web3";
import * as ContractAPI from "../api/contract_api";

const PrivateKeyProvider = require("truffle-privatekey-provider");

export const TOKEN_INFO = {
  addressIndex: {
    "0x0000000000000000000000000000000000000000": "ETH",
    "0xfc28028d9b1f6966fe74710653232972f50673be": "LRC",
    "0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a": "USDT",
    "0xfeb069407df0e1e4b365c10992f1bc16c078e34b": "LP-LRC-ETH",
    "0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e": "LP-ETH-USDT",
    "0xcd2c81b322a5b530b5fa3432e57da6803b0317f7": "DAI",
    "0x47525e6a5def04c9a56706e93f54cc70c2e8f165": "USDC",
    "0xf37cf4ced77b985708d591acc6bfd08586ab3409": "LP-USDC-ETH",
  },
  tokenMap: {
    ETH: {
      type: "ETH",
      tokenId: 0,
      symbol: "ETH",
      name: "Ethereum",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000000000000",
        maximum: "1000000000000000000000",
        dust: "200000000000000",
      },
      luckyTokenAmounts: {
        minimum: "50000000000000",
        maximum: "1000000000000000000000",
        dust: "50000000000000",
      },
      fastWithdrawLimit: "100000000000000000000",
      gasAmounts: {
        distribution: "85000",
        deposit: "100000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["LRC", "USDT", "USDC"],
    },
    LRC: {
      type: "erc20Trade",
      tokenId: 1,
      symbol: "LRC",
      name: "Loopring",
      address: "0xfc28028d9b1f6966fe74710653232972f50673be",
      decimals: 18,
      precision: 3,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000000000000000",
        maximum: "5000000000000000000000000",
        dust: "5000000000000000000",
      },
      luckyTokenAmounts: {
        minimum: "50000000000000000",
        maximum: "5000000000000000000000000",
        dust: "50000000000000000",
      },
      fastWithdrawLimit: "750000000000000000000000",
      gasAmounts: {
        distribution: "101827",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH"],
    },
    USDT: {
      type: "erc20Trade",
      tokenId: 2,
      symbol: "USDT",
      name: "USDT",
      address: "0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a",
      decimals: 6,
      precision: 2,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000",
        maximum: "2000000000000",
        dust: "250000",
      },
      luckyTokenAmounts: {
        minimum: "50000",
        maximum: "200000000000",
        dust: "50000",
      },
      fastWithdrawLimit: "250000000000",
      gasAmounts: {
        distribution: "106233",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH", "DAI"],
    },
    "LP-LRC-ETH": {
      type: "erc20Trade",
      tokenId: 4,
      symbol: "LP-LRC-ETH",
      name: "AMM-LRC-ETH",
      address: "0xfeb069407df0e1e4b365c10992f1bc16c078e34b",
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000000",
        maximum: "10000000000000000000",
        dust: "100000000",
      },
      luckyTokenAmounts: {
        minimum: "100000000",
        maximum: "10000000000000000000",
        dust: "100000000",
      },
      fastWithdrawLimit: "20000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
    "LP-ETH-USDT": {
      type: "erc20Trade",
      tokenId: 7,
      symbol: "LP-ETH-USDT",
      name: "LP-ETH-USDT",
      address: "0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e",
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000000",
        maximum: "10000000000000",
        dust: "100000000",
      },
      luckyTokenAmounts: {
        minimum: "100000000",
        maximum: "10000000000000",
        dust: "100000000",
      },
      fastWithdrawLimit: "20000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
    DAI: {
      type: "erc20Trade",
      tokenId: 6,
      symbol: "DAI",
      name: "dai",
      address: "0xcd2c81b322a5b530b5fa3432e57da6803b0317f7",
      decimals: 18,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "10000000000000000000",
        maximum: "100000000000000000000000",
        dust: "10000000000000000",
      },
      luckyTokenAmounts: {
        minimum: "10000000000000000000",
        maximum: "100000000000000000000000",
        dust: "10000000000000000000",
      },
      fastWithdrawLimit: "10000000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["USDT"],
    },
    USDC: {
      type: "USDC",
      tokenId: 8,
      symbol: "USDC",
      name: "USDC",
      address: "0x47525e6a5def04c9a56706e93f54cc70c2e8f165",
      decimals: 6,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "1000",
        maximum: "10000000000000000000",
        dust: "100",
      },
      luckyTokenAmounts: {
        minimum: "1000000",
        maximum: "10000000000",
        dust: "1000000",
      },
      fastWithdrawLimit: "20000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH"],
    },
    "LP-USDC-ETH": {
      type: "LP-USDC-ETH",
      tokenId: 9,
      symbol: "LP-USDC-ETH",
      name: "LP-USDC-ETH",
      address: "0xf37cf4ced77b985708d591acc6bfd08586ab3409",
      decimals: 8,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000",
        maximum: "1000000000000000000000000000000000000000",
        dust: "10000",
      },
      luckyTokenAmounts: {
        minimum: "1000000000000000",
        maximum: "10000000000000000000",
        dust: "1000000000000000",
      },
      fastWithdrawLimit: "20000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
  },
  idIndex: {
    "0": "ETH",
    "1": "LRC",
    "2": "USDT",
    "4": "LP-LRC-ETH",
    "6": "DAI",
    "7": "LP-ETH-USDT",
    "8": "USDC",
    "9": "LP-USDC-ETH",
  },
};

export const LOOPRING_EXPORTED_ACCOUNT = {
  address: "0x727E0Fa09389156Fc803EaF9C7017338EfD76E7F",
  privateKey:
    "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf",
  accountId: 12454,
  address2: "0xb6d8c39D5528357dBCe6BEd82aC71c74e9D19079",
  privateKey2:
    "e020ed769032ba95d9a5207687a663d6198fe2f5cedf28a250f7cbd8c81a5263",
  accountId2: 10488,
  addressCF: "0x23dE4Da688c94a66E8bbE9BCc95CB03b4e209C15",
  accountIdCF: 11632,
  addressContractWallet: "0xD4BD7c71B6d4A09217ccc713f740d6ed8f4EA0cd",
  depositAddr: "0xb684B265f650a77afd27Ce0D95252a7329B5bD72",
  exchangeAddr: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
  whitelistedAddress: "0x35405E1349658BcA12810d0f879Bf6c5d89B512C",
  whitelistedEddkey:
    "0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33",
  // const eddkeyWhitelisted =
  //   "0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33";
  //   apiKey: "2PYgTOZwXHkPXtJMlOMG06ZX1QKJInpoky6iYIbtMgmkbfdL4PvxyEOj0LPOfgYX",
  chainId: 5,
  nftTokenAddress: "0x8394cB7e768070217592572582228f62CdDE4FCE",
  nftTokenId: "32768",
  nftId: "0xa0ce8990402955e559799af24ea765b14ffecc32dfa1cce2dadaf20016b074e6",
  nftData: "0x1a2001aac7a1fd00cef07889cdb67b1355f86e5bc9df71cfa44fa1c7b49f598f",
  testNotOx: "ff7d59d9316eba168837e3ef924bcdfd64b237d8",
  tradeLRCValue: 1000000000000000000,
  tradeETHValue: 0.0001,
  gasPrice: 19, // for test
  gasLimit: 200000, // for test
};

const provider = new PrivateKeyProvider(
  LOOPRING_EXPORTED_ACCOUNT.privateKey,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
const provider2 = new PrivateKeyProvider(
  LOOPRING_EXPORTED_ACCOUNT.privateKey2,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
export const web3 = new Web3(provider);
export const web3_2 = new Web3(provider2);

export class LoopringAPI {
  public static userAPI: UserAPI;
  public static exchangeAPI: ExchangeAPI;
  public static ammpoolAPI: AmmpoolAPI;
  public static walletAPI: WalletAPI;
  public static wsAPI: WsAPI;
  public static nftAPI: NFTAPI;
  public static delegate: DelegateAPI;
  public static globalAPI: GlobalAPI;
  public static WhitelistedUserAPI: WhitelistedUserAPI;
  public static contractAPI: typeof ContractAPI;
  public static __chainId__: ChainId;
  public static InitApi = (chainId: ChainId) => {
    LoopringAPI.userAPI = new UserAPI({ chainId });
    LoopringAPI.exchangeAPI = new ExchangeAPI({ chainId });
    LoopringAPI.globalAPI = new GlobalAPI({ chainId });
    LoopringAPI.ammpoolAPI = new AmmpoolAPI({ chainId });
    LoopringAPI.walletAPI = new WalletAPI({ chainId });
    LoopringAPI.wsAPI = new WsAPI({ chainId });
    LoopringAPI.WhitelistedUserAPI = new WhitelistedUserAPI({ chainId });
    LoopringAPI.nftAPI = new NFTAPI({ chainId });
    LoopringAPI.__chainId__ = chainId;
    LoopringAPI.contractAPI = ContractAPI;
  };
}
export const CUSTOMER_KEY_SEED = "XXXXXX" + " with key nonce: " + "${nonce}";

export const DEFAULT_TIMEOUT = 30000;
