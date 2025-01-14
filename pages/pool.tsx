import BasicLayout from "components/Layout/Basic";
import pools from "const/pool";
import type { NextPage } from "next";
import ListPool from "views/pool/components/ListPool";
import PoolBanner from "views/pool/components/PoolBanner";
import PoolFilter from "views/pool/components/PoolFilter";
import PoolMenu from "views/pool/components/PoolMenu";

const Pools: NextPage = () => {
    return (
        <>
            <BasicLayout>
                <div className="ash-container pb-40">
                    <div className="mb-12 w-full max-w-[55.375rem] mx-auto">
                        <PoolBanner />
                    </div>
                    <div>
                        <PoolMenu />
                        {/* disable change view type if the screen size is sm, and auto set view type to list on SM screen */}
                        <PoolFilter />
                        <ListPool items={pools} className="pt-2 md:pt-8" />
                    </div>
                </div>
            </BasicLayout>
        </>
    );
};

export default Pools;
