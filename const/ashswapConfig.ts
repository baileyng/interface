import { ENVIRONMENT } from "./env";
type DappContracts = {
    voteEscrowedContract: string;
    feeDistributor: string;
};
type DappContractConfig = {
    alpha: DappContracts;
    beta: DappContracts;
};
const dappContractDevnet: DappContractConfig = {
    beta: {
        voteEscrowedContract:
            "erd1qqqqqqqqqqqqqpgqmvv8hpzg2d6fc5z9tcm8p2aes7qve26krmcqpw84n5",
        feeDistributor:
            "erd1qqqqqqqqqqqqqpgqylsfrzwl65ez8d34lqzu8zxks6vnua3trmcq6cr5v4",
    },
    alpha: {
        voteEscrowedContract:
            "erd1qqqqqqqqqqqqqpgqhcxzesh0q0cuvr4atp3jlmrvgguw2nvermcq3yu9rl",
        feeDistributor:
            "erd1qqqqqqqqqqqqqpgque0adu3plxy0r3gcamd4m2nl23hlud6srmcqzzyx6z",
    },
};

const dappContractMainnet: DappContracts = {
    voteEscrowedContract: "",
    feeDistributor: "",
};

const dappContract =
    ENVIRONMENT.NETWORK == "devnet"
        ? dappContractDevnet[ENVIRONMENT.ENV]
        : dappContractMainnet;

export const VE_CONFIG = {
    // main config
    maxLock: 4 * 365 * 24 * 3600,
    minLock: 7 * 24 * 3600,
    // for BoY
    // maxLock: 2 * 7 * 24 * 3600,
    // minLock: 12 * 60 * 60,
};

export const ASHSWAP_CONFIG = {
    ashApiBaseUrl: ENVIRONMENT.ASH_API,
    dappContract,
} as const;
