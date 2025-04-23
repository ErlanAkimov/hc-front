import React, { useEffect, useState } from "react";
import styles from "./Pools.module.scss";
// import { FilterIcon, SearchIcon } from "../../../../components/icons";
import { motion } from "motion/react";
import Tabs from "./Tab";
import PoolCard from "./PoolCard";
import axios from "axios";
// import { useAppDispatch } from "../../../../redux/hooks";
// import { setSearchPoolModal } from "../../../../redux/slices/appSlice";
import { Link } from "react-router-dom";

export interface IPoolCard {
    id: string;
    creator_username: string;
    creator_image: string;
    base_asset: string;
    leverage: string;
    limit_price: string;
    total_pool: string;
    collected_amount: string;
    contributors_count: number;
    comments_count: number;
    stop_loss: string;
    take_profit: string;
    created_at: string;
}

const Pools: React.FC = () => {
    const [pools, setPools] = useState<IPoolCard[] | null>(null);
    const [pickedTab, setPickedTab] = useState<number>(0);
    // const [filterModal, setFilterModal] = useState<boolean>(false);
    // const dispatch = useAppDispatch();

    useEffect(() => {
        if (pickedTab === 0) {
            axios.get("https://api.hash-cash.io/v1/pools/get-pools?limit=10&offset=0").then((res) => {
                setPools(res.data);
            });
        }
        if (pickedTab === 1) {
            axios.get("https://api.hash-cash.io/v1/pools/get-pools?limit=10&offset=0&sort=new").then((res) => {
                setPools(res.data);
            });
        }
        if (pickedTab === 2) {
            axios.get("https://api.hash-cash.io/v1/pools/get-pools?limit=10&offset=0&sort=run").then((res) => {
                setPools(res.data);
            });
        }
        if (pickedTab === 3) {
            axios.get("https://api.hash-cash.io/v1/pools/get-pools?limit=10&offset=0&sort=closed").then((res) => {
                setPools(res.data);
            });
        }
    }, [pickedTab]);

    // const handleSearch = () => {
    //     dispatch(setSearchPoolModal(true));
    // };

    // const handleFilterModal = () => {
    //     setFilterModal((prev) => !prev);
    // };

    // const handlePickFilter = () => {};

    return (
        <div className={styles.pools}>
            <div className={styles.header}>
                <div>
                    <h2 className="gr-title">Pools</h2>
                    <p className="gr-subtitle">Created trading pools</p>
                </div>

                <div className={styles.btns}>
                    {/* <button className={styles.miniBtn} onClick={handleFilterModal}>
                        <FilterIcon />
                        <AnimatePresence>
                            {filterModal && (
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    initial={{ opacity: 0 }}
                                    className={styles.filter}
                                >
                                    <button className={styles.filterBtn} onClick={handlePickFilter}>
                                        Futures
                                    </button>
                                    <button className={styles.filterBtn} onClick={handlePickFilter}>
                                        Spot (Soon)
                                    </button>
                                    <button className={styles.filterBtn} onClick={handlePickFilter}>
                                        LongStrategy (Soon)
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                    <button className={styles.miniBtn} onClick={handleSearch}>
                        <SearchIcon />
                    </button> */}
                    <Link to="/create-pool/step-1">
                        <motion.button whileTap={{ scale: 0.95 }} className={styles.create}>
                            Create Pool
                        </motion.button>
                    </Link>
                </div>
            </div>
            <Tabs pickedTab={pickedTab} setPickedTab={setPickedTab} />
            <div className={styles.poolCardsList}>{pools && pools.map((p, i) => <PoolCard pool={p} key={i} />)}</div>
        </div>
    );
};

export default Pools;
