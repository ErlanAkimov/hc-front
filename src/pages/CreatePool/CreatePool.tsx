import React, { useEffect, useState } from "react";
import styles from "./CreatePool.module.scss";
import { BackArrowIcon, PoolTypeBottomIcon, PoolTypeTopIcon } from "../../components/icons";
import { Link, useNavigate } from "react-router-dom";

import btc from "/symbol-btc.webp";
import eth from "/symbol-eth.webp";
import ton from "/symbol-ton.webp";
import doge from "/symbol-doge.png";
import axios from "axios";

interface IAsset {
    name: string;
    logo: string;
    shortname: string;
    diff?: string;
    price?: number;
}

const assetsList: IAsset[] = [
    {
        name: "Bitcoin",
        logo: btc,
        shortname: "BTC",
    },
    {
        name: "Ethereum",
        logo: eth,
        shortname: "ETH",
    },
    {
        name: "Dogecoin",
        logo: doge,
        shortname: "DOGE",
    },
    {
        name: "Toncoin",
        logo: ton,
        shortname: "TON",
    },
];

const CreatePool: React.FC = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState<IAsset[]>(assetsList);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const updateAll = async () => {
            try {
                const { data } = await axios.get(
                    `https://tonapi.io/v2/rates?tokens=${["ton", "btc", "not", "doge", "eth"]}&currencies=usdt`
                );

                const rates = data.rates;
                const ratedAssets = assets.map((a) => {
                    const rate = rates[a.shortname];
                    a.price = rate.prices.USDT;
                    a.diff = rate.diff_24h.USDT;
                    return a;
                });
                setAssets(ratedAssets);
            } catch {}
        };
        updateAll();

        const interval = setInterval(updateAll, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.createPool}>
            <div className={styles.backHeader}>
                <div className={styles.backIconBlock} onClick={handleBack}>
                    <BackArrowIcon />
                </div>
            </div>

            <div className={styles.titles}>
                <div className="gr-title">Choose strategy</div>
                <div className="gr-subtitle">
                    Choose strategy before <span>creating pool</span>
                </div>
            </div>

            <div className="tabs">
                <button className="activeTab">Futures</button>
                <button className="tab">
                    Spot <span className={styles.soonBtn}>soon</span>
                </button>
                <button className="tab">
                    Strategy <span className={styles.soonBtn}>soon</span>
                </button>
            </div>

            {/* <div className={styles.filters}>
                <button className={styles.pickedType}>All</button>
                <button className={styles.type}>🔥 Hot</button>
                <button className={styles.type}>🌱 New</button>
            </div> */}

            <div className={styles.assetsList}>
                {assets.map((asset: IAsset, index: number) => {
                    return (
                        <Link to={`/create-pool/step-2?asset=${asset.shortname}`} key={index}>
                            <div className={styles.asset}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div className={styles.imgBlock}>
                                        <img src={asset.logo} alt="" />
                                    </div>

                                    <div>
                                        <h3 className={styles.assetCode}>{asset.shortname}/USDT</h3>
                                        <p className={styles.assetName}>{asset.name}</p>
                                    </div>

                                    <div style={{ marginLeft: 30 }}>
                                        {asset.diff && asset.diff.split("")[0] === "+" ? (
                                            <PoolTypeTopIcon />
                                        ) : (
                                            <PoolTypeBottomIcon />
                                        )}
                                    </div>
                                </div>

                                <div className={styles.prices}>
                                    <p className={styles.price}>
                                        <span className={styles.usdtSign}>$</span>{" "}
                                        {asset.price && formatNumber(asset.price)}
                                    </p>
                                    <span
                                        className={styles.diffSpan}
                                        style={{
                                            color: asset.diff?.split("")[0] === "+" ? "var(--color-green)" : "red",
                                        }}
                                    >
                                        {asset.diff && asset.diff}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CreatePool;

function formatNumber(n: number): string {
    return n < 1000 ? `${n.toFixed(2)}` : `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 2)}К`;
}
