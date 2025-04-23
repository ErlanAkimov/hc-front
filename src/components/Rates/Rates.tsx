import React, { useEffect, useState } from "react";
import styles from "./Rates.module.scss";
import axios from "axios";

const ratesMock = [
    {
        title: "TON/USDT",
        value: 0,
    },
    {
        title: "BTC/USDT",
        value: 2378.22,
    },
    {
        title: "DOGE/USDT",
        value: 0,
    },
    {
        title: "ETH/USDT",
        value: 0,
    },
];

const Rates: React.FC = () => {
    const [rates, setRates] = useState<{ title: string; value: number }[]>(ratesMock);
    useEffect(() => {
        const fetchRates = async () => {
            const { data } = await axios.get<{
                rates: Record<string, { prices: Record<string, number> }>;
            }>(`https://tonapi.io/v2/rates?tokens=${["ton", "btc", "doge", "eth"]}&currencies=usdt`);

            const order = ["TON", "BTC", "DOGE", "ETH"];

            const rates = order.map((key) => {
                const res = data.rates[key];
                return {
                    title: `${key}/USDT`,
                    value: Number(res.prices["USDT"].toFixed(2)),
                };
            });
            setRates(rates);
        };
        fetchRates();
        const interval = setInterval(fetchRates, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.rates}>
            <div className={styles.ratesWrapper}>
                {[...rates, ...rates, ...rates, ...rates, ...rates, ...rates].map((rate, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.rate}>
                            <h2 className={`gr-title ${styles.title}`}>{rate.title}</h2>
                            <p className={`gr-subtitle ${styles.subtitle}`}>{rate.value}</p>
                        </div>
                        {index < rates.length * 6 - 1 && <div className={styles.divider} />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Rates;
