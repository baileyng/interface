import ICCapacity from "assets/svg/capacity.svg";
import ICChevronDown from "assets/svg/chevron-down.svg";
import ICChevronUp from "assets/svg/chevron-up.svg";
import ICLock from "assets/svg/lock.svg";
import ICUnlock from "assets/svg/unlock.svg";
import ICWallet from "assets/svg/wallet.svg";
import GOVStakeModal from "components/GOVStakeModal";
import HeadlessModal, {
    HeadlessModalDefaultHeader
} from "components/HeadlessModal";
import { network } from "const/network";
import { ASH_TOKEN, VE_ASH_DECIMALS } from "const/tokens";
import { useDappContext } from "context/dapp";
import { useStakeGov } from "context/gov";
import { useWallet } from "context/wallet";
import { toEGLDD } from "helper/balance";
import { fetcher } from "helper/common";
import { formatAmount, fractionFormat } from "helper/number";
import useMounted from "hooks/useMounted";
import { useScreenSize } from "hooks/useScreenSize";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import useSWR from "swr";

function GovStats() {
    const { data: adminFee24h } = useSWR<number>(
        `${network.ashApiBaseUrl}/stake/governance/admin-fee`,
        fetcher
    );
    const [isQAExpand, setIsQAExpand] = useState(false);
    const [openStakeGov, setOpenStakeGov] = useState(false);
    const [openHarvestResult, setOpenHarvestResult] = useState(false);
    const {
        lockedAmt,
        veASH,
        unlockTS,
        totalSupplyVeASH,
        totalLockedAmt,
        rewardLPAmt,
        rewardLPToken,
        rewardValue,
        totalLockedPct,
        claimReward,
        unlockASH,
    } = useStakeGov();
    const dapp = useDappContext();
    const mounted = useMounted();
    const { connectWallet, tokenPrices } = useWallet();
    const screenSize = useScreenSize();
    const fLockedAmt = useMemo(() => {
        return fractionFormat(
            toEGLDD(ASH_TOKEN.decimals, lockedAmt).toNumber()
        );
    }, [lockedAmt]);
    const fVEASHAmt = useMemo(() => {
        return fractionFormat(toEGLDD(VE_ASH_DECIMALS, veASH).toNumber());
    }, [veASH]);
    const fTotalVeASH = useMemo(() => {
        return fractionFormat(
            toEGLDD(VE_ASH_DECIMALS, totalSupplyVeASH).toNumber()
        );
    }, [totalSupplyVeASH]);
    const capacityPct = useMemo(() => {
        if (totalSupplyVeASH.eq(0)) return "_";
        return veASH.multipliedBy(100).div(totalSupplyVeASH).toFixed(2);
    }, [veASH, totalSupplyVeASH]);
    const fTotalLockedAmt = useMemo(() => {
        return fractionFormat(
            toEGLDD(ASH_TOKEN.decimals, totalLockedAmt).toNumber()
        );
    }, [totalLockedAmt]);
    const fRewardValue = useMemo(() => {
        if (!rewardValue || rewardValue.eq(0)) return "0";
        const num = rewardValue.toNumber();
        return fractionFormat(num, { maximumFractionDigits: num < 1 ? 6 : 2 });
    }, [rewardValue]);
    const apr = useMemo(() => {
        if (!adminFee24h) return 0;
        return (
            (adminFee24h * 365 * 100) /
            toEGLDD(ASH_TOKEN.decimals, totalLockedAmt)
                .multipliedBy(tokenPrices[ASH_TOKEN.id])
                .toNumber()
        );
    }, [adminFee24h, totalLockedAmt, tokenPrices]);
    const canClaim = useMemo(() => {
        return rewardLPAmt && rewardLPAmt.gt(0);
    }, [rewardLPAmt]);
    const canUnlockASH = useMemo(() => {
        return (
            lockedAmt.gt(0) &&
            unlockTS &&
            unlockTS.minus(moment().unix()).lte(0)
        );
    }, [unlockTS, lockedAmt]);
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-pink-600 text-2xl md:text-5xl font-bold mb-7 md:mb-11">
                    Governance Stake
                </h1>
                <div className="hidden md:flex space-x-2">
                    {/* <button className="bg-pink-600/20 text-pink-600 h-12 px-6 flex items-center justify-center">
                            Weekly Summary
                        </button> */}
                    {dapp.loggedIn && (
                        <button
                            className="bg-pink-600 text-white h-12 px-6 flex items-center justify-center"
                            onClick={() => setOpenStakeGov(true)}
                        >
                            Add/Manage Stake
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-[21.875rem] flex-shrink-0 flex flex-col px-7 lg:px-9 pb-9 pt-7 lg:pt-14 bg-stake-dark-400 mb-4 md:mb-0 md:mr-4 lg:mr-[1.875rem]">
                    <h2 className="text-lg md:text-2xl mb-11 md:mb-11 font-bold text-white">
                        Your staked
                    </h2>
                    <div className="flex flex-col space-y-6">
                        <div className="bg-ash-dark-400/30 px-[1.25rem] pt-7 pb-5">
                            <div className="px-5 mb-7">
                                <div className="text-stake-gray-500 text-sm font-bold underline uppercase mb-7">
                                    your reward
                                </div>
                                <div className="flex items-center">
                                    {rewardLPToken && (
                                        <div className="flex items-center">
                                            <div className="w-[1.125rem] h-[1.125rem]">
                                                <Image
                                                    src={
                                                        rewardLPToken.tokens[0]
                                                            .icon
                                                    }
                                                    alt="token icon"
                                                />
                                            </div>
                                            <div className="w-[1.125rem] h-[1.125rem] -ml-1 mr-2">
                                                <Image
                                                    src={
                                                        rewardLPToken.tokens[1]
                                                            .icon
                                                    }
                                                    alt="token icon"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-lg">
                                        <span className="text-ash-gray-500">
                                            $
                                        </span>
                                        <span className="text-white font-bold">
                                            {fRewardValue}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={`text-sm font-bold w-full h-[3.375rem] flex items-center justify-center ${
                                    canClaim
                                        ? "bg-ash-cyan-500 text-ash-dark-400"
                                        : "bg-ash-dark-400 text-white"
                                }`}
                                disabled={!canClaim}
                                onClick={() =>
                                    canClaim &&
                                    claimReward().then((tx) =>
                                        setOpenHarvestResult(!!tx)
                                    )
                                }
                            >
                                Harvest
                            </button>
                        </div>
                        <div className="bg-ash-dark-400/30 px-[1.25rem] pt-7 pb-5">
                            <div className="px-5 mb-7">
                                <div className="text-stake-gray-500 text-sm font-bold underline uppercase mb-7">
                                    your staked ash
                                </div>
                                <div className="flex items-center">
                                    {/* <div className="w-[1.125rem] h-[1.125rem] mr-2">
                                        <Image src={ImgUsdt} alt="token icon" />
                                    </div> */}
                                    <div className="w-[1.125rem] h-[1.125rem] mr-2 rounded-full bg-pink-600"></div>
                                    <div className="text-lg text-white font-bold">
                                        {fLockedAmt}
                                    </div>
                                </div>
                            </div>
                            {canUnlockASH ? (
                                <button
                                    className="bg-yellow-600 text-white text-sm font-bold w-full h-[3.375rem] flex items-center justify-center"
                                    onClick={() => unlockASH()}
                                >
                                    <ICUnlock className="w-6 h-6 mr-2" />
                                    <span>Withdraw</span>
                                </button>
                            ) : (
                                <button
                                    className="bg-ash-dark-400 text-stake-gray-500 text-sm font-bold w-full h-[3.375rem] flex items-center justify-center cursor-not-allowed"
                                    disabled={true}
                                >
                                    <ICLock className="w-6 h-6 mr-2" />
                                    <span>
                                        {lockedAmt.gt(0)
                                            ? moment
                                                  .unix(unlockTS.toNumber())
                                                  .format("DD MMM, yyyy")
                                            : "Lock period"}
                                    </span>
                                </button>
                            )}
                        </div>
                        <div className="bg-ash-dark-400/30 px-[1.25rem] pt-7 pb-5">
                            <div className="px-5 mb-7">
                                <div className="text-stake-gray-500 text-sm font-bold underline mb-7">
                                    YOUR veASH
                                </div>
                                <div className="flex items-center">
                                    {/* <div className="w-[1.125rem] h-[1.125rem] mr-2">
                                        <Image src={ImgUsdt} alt="token icon" />
                                    </div> */}
                                    <div className="w-[1.125rem] h-[1.125rem] mr-2 rounded-full bg-ash-purple-500"></div>
                                    <div className="text-lg text-white font-bold">
                                        {fVEASHAmt}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="bg-ash-dark-400 text-stake-gray-500 px-3 py-2 w-7/12 h-[3.375rem] overflow-hidden">
                                    <div className="flex items-center mb-2">
                                        <ICLock className="w-3 h-3 mr-1" />
                                        <span className="text-2xs font-bold underline">
                                            Lock
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold">
                                        {lockedAmt.gt(0)
                                            ? moment
                                                  .unix(unlockTS.toNumber())
                                                  .format("DD MMM, yyyy")
                                            : "_"}
                                    </div>
                                </div>
                                <div className="bg-ash-dark-400 text-stake-gray-500 px-3 py-2 w-5/12 h-[3.375rem] overflow-hidden">
                                    <div className="flex items-center mb-2">
                                        <ICCapacity className="w-3 h-3 mr-1" />
                                        <span className="text-2xs font-bold underline">
                                            Capacity
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold">
                                        {capacityPct}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {mounted &&
                        (dapp.loggedIn ? (
                            <button
                                className="bg-pink-600 text-white text-sm md:text-lg font-bold w-full h-14 md:h-[4.5rem] flex items-center justify-center mt-3"
                                onClick={() => setOpenStakeGov(true)}
                            >
                                Add / Manage Stake
                            </button>
                        ) : (
                            <button
                                className="bg-pink-600 text-white text-sm md:text-lg font-bold w-full h-14 md:h-[4.5rem] flex items-center justify-center mt-3"
                                onClick={() => connectWallet()}
                            >
                                <ICWallet className="mr-2" />
                                <span>Connect wallet</span>
                            </button>
                        ))}
                </div>
                <div className="flex-grow px-7 lg:px-16 pt-7 lg:pt-14 pb-9 bg-stake-dark-400">
                    <h2 className="text-lg md:text-2xl mb-10 md:mb-11 font-bold text-white">
                        Overall stats
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-7.5 gap-y-1 sm:gap-y-4 lg:gap-y-6 mb-16">
                        <div className="bg-ash-dark-400/30 px-[2.375rem] py-7 flex flex-col justify-between">
                            <div className="text-stake-gray-500 text-sm font-bold mb-6 sm:mb-2 leading-tight">
                                APR
                            </div>
                            <div className="text-pink-600 text-lg font-bold leading-tight">
                                {formatAmount(apr)}%
                            </div>
                        </div>
                        <div className="bg-ash-dark-400/30 px-[2.375rem] py-7 flex flex-col justify-between">
                            <div className="text-stake-gray-500 text-sm font-bold mb-6 sm:mb-2 uppercase leading-tight">
                                PERCENTAGE of total ASH Locked
                            </div>
                            <div className="text-white text-lg font-bold leading-tight">
                                {totalLockedPct < 0.01
                                    ? "< 0.01"
                                    : totalLockedPct.toFixed(2)}
                                %
                            </div>
                        </div>
                        <div className="bg-ash-dark-400/30 px-[2.375rem] py-7 flex flex-col justify-between">
                            <div className="text-stake-gray-500 text-sm font-bold mb-6">
                                TOTAL STAKED ASH
                            </div>
                            <div className="flex items-center">
                                {/* <div className="w-[1.125rem] h-[1.125rem] mr-2">
                                    <Image src={ImgUsdt} alt="token icon" />
                                </div> */}
                                <div className="w-[1.125rem] h-[1.125rem] mr-2 rounded-full bg-pink-600"></div>
                                <div className="text-white text-lg font-bold">
                                    {fTotalLockedAmt}
                                </div>
                            </div>
                        </div>
                        <div className="bg-ash-dark-400/30 px-[2.375rem] py-7 flex flex-col justify-between">
                            <div className="text-stake-gray-500 text-sm font-bold mb-6">
                                TOTAL veASH
                            </div>
                            <div className="flex items-center">
                                {/* <div className="w-[1.125rem] h-[1.125rem] mr-2">
                                    <Image src={ImgUsdt} alt="token icon" />
                                </div> */}
                                <div className="w-[1.125rem] h-[1.125rem] mr-2 rounded-full bg-ash-purple-500"></div>
                                <div className="text-white text-lg font-bold">
                                    {fTotalVeASH}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-16">
                        <div className="text-stake-gray-500 text-sm font-bold mb-4">
                            TIPS
                        </div>
                        <div className="text-xs lg:text-sm mb-9">
                            Stake ASH to receive veASH. You can both earn from
                            transaction fee & have a power for voting!
                        </div>
                        <ul>
                            <li className="text-sm font-bold">
                                <span className="text-stake-green-500">1</span>{" "}
                                ASH locked for{" "}
                                <span className="text-stake-green-500">
                                    4 years
                                </span>{" "}
                                ={" "}
                                <span className="text-stake-green-500">1</span>{" "}
                                veASH
                            </li>
                            <li className="text-sm font-bold">
                                <span className="text-stake-green-500">1</span>{" "}
                                ASH locked for{" "}
                                <span className="text-stake-green-500">
                                    3 years
                                </span>{" "}
                                ={" "}
                                <span className="text-stake-green-500">
                                    0.75
                                </span>{" "}
                                veASH
                            </li>
                            <li className="text-sm font-bold">
                                <span className="text-stake-green-500">1</span>{" "}
                                ASH locked for{" "}
                                <span className="text-stake-green-500">
                                    2 years
                                </span>{" "}
                                ={" "}
                                <span className="text-stake-green-500">
                                    0.5
                                </span>{" "}
                                veASH
                            </li>
                            <li className="text-sm font-bold">
                                <span className="text-stake-green-500">1</span>{" "}
                                ASH locked for{" "}
                                <span className="text-stake-green-500">
                                    1 year
                                </span>{" "}
                                ={" "}
                                <span className="text-stake-green-500">
                                    0.25
                                </span>{" "}
                                veASH
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-whtie text-sm font-bold mb-5">
                            IMPORTANT NOTE
                        </div>
                        <div className="text-xs lg:text-sm mb-6">
                            Your veASH weight gradually decreases as your
                            escrowed tokens approach their lock expiry.
                        </div>
                        <div className="bg-ash-dark-400/30">
                            <button
                                className="w-full h-14 lg:h-[4.25rem] px-4 lg:px-[2.375rem] flex items-center justify-between text-pink-600"
                                onClick={() => setIsQAExpand((val) => !val)}
                            >
                                <div className="line-clamp-2 text-xs lg:text-sm font-bold flex-grow text-left mr-4">
                                    OMG? Does it mean user will lose money
                                    everyday?
                                </div>
                                {isQAExpand ? (
                                    <ICChevronUp className="w-3 h-auto" />
                                ) : (
                                    <ICChevronDown className="w-3 h-auto" />
                                )}
                            </button>
                            {isQAExpand && (
                                <div className="-mt-1 pb-8 px-4 lg:px-[2.375rem] text-2xs">
                                    <div className="mb-4">
                                        Of course not, when your veASH decreases
                                        to 0. It also means that the lock period
                                        of your ASH is done. You can withdraw
                                        your staked ASH right away.
                                    </div>
                                    <div>
                                        However, If you want to keep your veASH
                                        stays on the maximum, just{" "}
                                        <span className="text-pink-600 underline font-bold">
                                            extend
                                        </span>{" "}
                                        your lock period.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <GOVStakeModal
                open={openStakeGov}
                onClose={() => setOpenStakeGov(false)}
            />
            <HeadlessModal
                open={openHarvestResult}
                onClose={() => setOpenHarvestResult(false)}
                transition={`${screenSize.isMobile ? "btt" : "center"}`}
            >
                <div className="clip-corner-4 clip-corner-tl bg-stake-dark-400 mx-auto max-w-[33.75rem] fixed bottom-0 inset-x-0 sm:static sm:mt-28 flex flex-col max-h-full">
                    <div className="px-4 pt-4">
                        <HeadlessModalDefaultHeader
                            onClose={() => setOpenHarvestResult(false)}
                        />
                    </div>
                    <div className="flex-grow overflow-auto pt-14">
                        <div className="px-[3.375rem] flex flex-col items-center pb-28 border-b border-dashed border-b-ash-gray-500">
                            <div className="text-2xl font-bold text-stake-green-500 mb-12">
                                Harvest successfully
                            </div>
                            {rewardLPToken && (
                                <>
                                    <div className="flex items-center mb-9">
                                        <div className="w-8 h-8">
                                            <Image
                                                src={
                                                    rewardLPToken.tokens[0].icon
                                                }
                                                layout="responsive"
                                                alt="token icon"
                                            />
                                        </div>
                                        <div className="w-8 h-8 -ml-1 mr-2">
                                            <Image
                                                src={
                                                    rewardLPToken.tokens[1].icon
                                                }
                                                layout="responsive"
                                                alt="token icon"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center text-ash-gray-500 text-lg font-bold">
                                        ${fRewardValue} LP-
                                        {rewardLPToken.tokens[0].name}
                                        {rewardLPToken.tokens[0].name} has been
                                        sent to your wallet
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="px-[3.375rem] pb-8">
                            <div className="text-center text-sm text-ash-gray-500 py-7">
                                Suggest actions
                            </div>
                            <Link href="/stake/farms" passHref>
                                <a>
                                    <button className="w-full text-center h-12 text-sm font-bold bg-ash-dark-400 text-ash-cyan-500 mb-4">
                                        Stake for farming
                                    </button>
                                </a>
                            </Link>
                            <Link href="/pool" passHref>
                                <a>
                                    <button className="w-full text-center h-12 text-sm font-bold bg-ash-dark-400 text-pink-600">
                                        Withdraw immediately
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </HeadlessModal>
        </>
    );
}

export default GovStats;