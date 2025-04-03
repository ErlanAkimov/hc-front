import React from "react";
import styles from "./Pools.module.scss";
import { FilterIcon, SearchIcon } from "../../../../components/icons";
import { motion } from "motion/react";
import Tabs from "./Tab";
import PoolCard from "./PoolCard";

const Pools: React.FC = () => {
    return (
        <div className={styles.pools}>
            <div className={styles.header}>
                <div>
                    <h2 className="gr-title">Pools</h2>
                    <p className="gr-subtitle">Created trading pools</p>
                </div>

                <div className={styles.btns}>
                    <button className={styles.filters}>
                        <FilterIcon />
                    </button>
                    <button className={styles.icons}>
                        <SearchIcon />
                    </button>
                    <motion.button whileTap={{ scale: 0.95 }} className={styles.create}>
                        Create Pool
                    </motion.button>
                </div>
            </div>
            <Tabs />
            <div className={styles.poolCardsList}>
                <PoolCard />
                <PoolCard />
            </div>
        </div>
    );
};

export default Pools;
