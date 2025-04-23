import React, { useEffect, useState } from "react";
import styles from "./Profilepage.module.scss";
import Chart from "../../components/LeaderboardCard/Chart";
import { PersonIcon } from "../../components/icons";
import Header from "../../components/Header/Header";
import axios from "axios";
import { IPoolCard } from "../Homepage/components/Pools/Pools";
import PoolCard from "../Homepage/components/Pools/PoolCard";

const Profilepage: React.FC = () => {
    const [pickedPoolsType, setPickedPoolsType] = useState<number>(0);
    const [isActivePools, setIsActivePools] = useState<boolean>(true);
    const [user, setUser] = useState<{
        balance: number;
        PNL: number;
        ROI: string;
        chart: { x: number; y: number }[];
        created_pools: IPoolCard[];
        hc_points: 0;
        joined_pools: IPoolCard[];
        subscribers: number;
        winrate: number;
    }>();

    const handlePickPoolsType = (index: number) => {
        setPickedPoolsType(index);
    };

    const getUserProfile = async () => {
        const { data } = await axios.get(
            `https://api.hash-cash.io/v1/profile/${window.Telegram.WebApp.initDataUnsafe.user.id}/`
        );
        setUser(data);
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className={styles.profilepage}>
            <Header />
            <div className={`gr-title ${styles.balance}`}>$ {user && user.balance}</div>

            <div className={styles.statsblock}>
                <div className={styles.stats}>
                    <p>
                        ROI: <span style={{ color: "rgba(255, 45, 85, 1)" }}>{user && user.ROI}</span>
                    </p>
                    <p>
                        PNL: <span style={{ color: "rgba(49, 209, 88, 1)" }}>{user && user.PNL} TON</span>
                    </p>
                </div>
                <div className={styles.chart}>{user && <Chart chart={user.chart} width={143} height={50} />}</div>
            </div>

            <div className={styles.blocks}>
                <div className={styles.block}>
                    <p className={styles.hcvalue}>{user && user.hc_points}</p>
                    <p className={styles.hctext}>
                        <span>HC</span>-points
                    </p>
                </div>
                <div className={styles.block}>
                    <p className={styles.subs}>
                        <PersonIcon /> {user && user.subscribers}
                    </p>
                    <p className={styles.hctext}>Subscribers</p>
                </div>
                <div className={styles.block}>
                    <p className={styles.wr} style={{ color: "rgba(49, 209, 88, 1)" }}>
                        {user && user.winrate} {/* <span>(32/10)</span> */}
                    </p>
                    <p className={styles.hctext}>Win rate</p>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    onClick={() => handlePickPoolsType(0)}
                    className={pickedPoolsType === 0 ? styles.activeTab : styles.tab}
                >
                    Joined Pool
                </button>
                <button
                    onClick={() => handlePickPoolsType(1)}
                    className={pickedPoolsType === 1 ? styles.activeTab : styles.tab}
                >
                    Created Pool
                </button>
            </div>

            <div className={styles.picker}>
                <button
                    onClick={() => setIsActivePools(true)}
                    className={isActivePools ? styles.pickedType : styles.type}
                >
                    Active
                </button>
                <button
                    onClick={() => setIsActivePools(false)}
                    className={isActivePools ? styles.type : styles.pickedType}
                >
                    Closed
                </button>
            </div>

            <div className={styles.list}>
                {user &&
                    [user.created_pools, user.joined_pools][pickedPoolsType].map((pool, index) => (
                        <PoolCard key={index} pool={pool} />
                    ))}
            </div>
        </div>
    );
};

export default Profilepage;
