import React, { useEffect, useState } from "react";
import styles from "./Pools.module.scss";

import btcSymbol from "/symbol-btc.webp";
import tonSymbol from "/symbol-ton.webp";
import ethSymbol from "/symbol-eth.webp";
import solSymbol from "/symbol-sol.png";
import dogeSymbol from "/symbol-doge.png";

import { CommentsIcon, LifeTimeIcon, PersonIcon, ShortIcon } from "../../../../components/icons";
import CircularProgress from "./CircularProgress";
import { Link } from "react-router-dom";
import { IPoolCard } from "./Pools";

export const assetImages: Record<string, string> = {
    ETH: ethSymbol,
    TON: tonSymbol,
    BTC: btcSymbol,
    SOL: solSymbol,
    DOGE: dogeSymbol,
};

const PoolCard: React.FC<{ pool: IPoolCard }> = ({ pool }) => {
    const [stopLoss, setStopLoss] = useState<number>(0);
    const [takeProfit, setTakeProfit] = useState<number>(0);
    const [lifetime, setLifetime] = useState<number>(0);

    useEffect(() => {
        const entry = Number(pool.limit_price);
        const tp = Number(pool.take_profit);
        const leverage = Number(pool.leverage);
        const sl = Number(pool.stop_loss);

        const createdAt = new Date(pool.created_at);
        const now = new Date();

        const diffMs: number = now.getTime() - createdAt.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

        setLifetime(diffHrs);

        setStopLoss(Math.abs((sl / entry - 1) * leverage * 100));
        setTakeProfit(Math.abs((tp / entry - 1) * leverage * 100));
    }, []);

    function getPoolFillPercent(pool: { total_pool: string; collected_amount: string }): number {
        const total = Number(pool.total_pool);
        const collected = Number(pool.collected_amount);
        return total === 0 ? 0 : +((collected / total) * 100).toFixed(0);
    }

    return (
        <div className={styles.poolcard}>
            <CircularProgress percentage={getPoolFillPercent(pool)} />
            <div className={styles.topside}>
                <div className={styles.lside}>
                    <div className={styles.imgBlock}>
                        <img src={assetImages[pool.base_asset]} alt="" />
                    </div>
                    <ShortIcon />
                </div>

                <div className={styles.rside}>
                    <p className={styles.cardname}>{pool.base_asset}</p>
                    <p className={styles.username}>
                        <img src={pool.creator_image} alt="" />@{pool.creator_username}
                    </p>
                    <div className={styles.info}>
                        <p>
                            Lev: <span>x{pool.leverage.split(".")[0]}</span>
                        </p>
                        <p>
                            Price: <span>Market</span>
                        </p>
                        <p>
                            Pool:{" "}
                            <span>
                                {Math.floor(Number(pool.total_pool)) + "/" + Math.floor(Number(pool.collected_amount))}
                            </span>
                        </p>
                    </div>

                    <div className={styles.details}>
                        <p className={styles.type}>Short</p>
                        <p>
                            SL: <span>-{stopLoss.toFixed(0)}%</span>
                        </p>
                        <p>
                            TP: <span>+{takeProfit.toFixed(0)}%</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.bottomside}>
                <div className={styles.poolInfo}>
                    <p>
                        <LifeTimeIcon />{" "}
                        {lifetime > 30
                            ? `${Math.floor(lifetime / 24 / 30)}m ${
                                  Math.floor((lifetime / 24) % 30) > 0 ? Math.floor((lifetime / 24) % 30) + "d" : ""
                              }`
                            : lifetime > 24
                              ? `${Math.floor(lifetime / 24)}d ${lifetime % 24}h`
                              : `${lifetime}h`}
                    </p>
                    <p>
                        <PersonIcon /> {pool.contributors_count}
                    </p>
                    <p>
                        <CommentsIcon /> {pool.comments_count}
                    </p>
                </div>
                <Link to={`/pool/${pool.id}`}>
                    <button className={styles.join}>+ Join Pool</button>
                </Link>
            </div>
        </div>
    );
};

export default PoolCard;
