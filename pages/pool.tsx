import {useState} from 'react'
import type { NextPage } from 'next'
import BasicLayout from "components/Layout/Basic";
import ListPool from 'components/ListPool';
import pools from 'const/pool';
import PoolBanner from 'components/PoolBanner';
import PoolMenu from 'components/PoolMenu';
import styles from 'styles/Pool.module.css'
import PoolFilter, {ViewType} from 'components/PoolFilter';

const Home: NextPage = () => {
    const [view, setView] = useState<ViewType>(ViewType.Card);
    const [search, setSearch] = useState<string>("")

    return (
        <BasicLayout>
            <PoolBanner />
            <div className={styles.content}>
                <PoolMenu />
                <PoolFilter view={view} onChangeView={setView} search={search} onSearch={setSearch} />
                <ListPool items={pools} view={view} search={search} />
            </div>
        </BasicLayout>
    )
}

export default Home