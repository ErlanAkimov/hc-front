import React, { useState } from "react";
import styles from "./CreatePoolStep2.module.scss";
import { BackArrowIcon } from "../../components/icons";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Address, beginCell, toNano } from "@ton/core";

import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const CreatePoolStep2: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const asset = params.get("asset");
    const isShort = params.get("isShort") === "true";
    const user = useAppSelector((state) => state.user);

    const [feeValue, setFeeValue] = useState<number>(0);
    const [isMarketPrice, setIsMarketPrice] = useState<boolean>(true);
    const [leverageValue, setLeverageValue] = useState<number>(10);
    const [price, setPrice] = useState<string>("");
    const [stopLoss, setStopLoss] = useState<number>(0);
    const [takeProfit, setTakeProfit] = useState<number>(0);
    const [marginAmountValue, setMarginAmountValue] = useState<number | string>("");
    const [tc] = useTonConnectUI();
    const wallet = useTonWallet();
    const [modal, setModal] = useState<boolean>(false);

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleChangeMarginAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setMarginAmountValue(value === "" ? "" : Number(value));
        }
    };

    const handlePickValue = (index: number) => {
        setFeeValue(index);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handlePickPricing = (bool: boolean) => {
        setIsMarketPrice(bool);
    };

    const handleChangeLeverage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeverageValue(Number(e.target.value));
    };

    const handleCreatePool = async () => {
        if (!wallet) {
            return tc.openModal();
        }
        const { data } = await axios.get(`https://tonapi.io/v2/rates?tokens=${asset}&currencies=usdt`);
        const price = data.rates[asset!]?.prices.USDT;
        const stop_loss = (isShort ? price + price * stopLoss : price - price * stopLoss).toFixed(6).slice(0, 12);
        const take_profit = (isShort ? price - price * takeProfit : price + price * takeProfit).toFixed(6).slice(0, 12);

        // if (marginAmountValue === 0 || Number(marginAmountValue) < 1) return;

        const body = {
            user_id: user.id,
            amount: Number(marginAmountValue),
            base_asset: asset,
            is_market: isMarketPrice,
            leverage: leverageValue,

            limit_price: price.toFixed(6).slice(0, 12),
            position_fees_type: feeValue,
            position_type: true,
            stop_price: price.toFixed(6).slice(0, 12),

            // creator_fee: feeValue,
            stop_loss,
            take_profit,
        };

        axios
            .post("https://api.hash-cash.io/v1/create_position/", body, {
                headers: { Authorization: `Token ${user.authToken}` },
            })

            .then((res) => {
                tc.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 300,
                    messages: [
                        {
                            address: Address.parse(res.data.deposit.address).toString({ bounceable: false }),
                            amount: toNano(res.data.deposit.amount).toString(),
                            payload: beginCell()
                                .storeUint(0, 32)
                                .storeStringTail(res.data.deposit.comment)
                                .endCell()
                                .toBoc()
                                .toString("base64"),
                        },
                    ],
                }).then(() => setModal(true));
            });
    };

    return (
        <div className={styles.wrapper}>
            <AnimatePresence>
                {modal && (
                    <div className={styles.modal}>
                        <p>Your transaction successfully sented to blockchain.</p>
                        <Link to="/">
                            <motion.button whileTap={{ scale: 0.95 }}>Return to home</motion.button>
                        </Link>
                    </div>
                )}
            </AnimatePresence>
            <div className={styles.backHeader}>
                <div className={styles.backIconBlock} onClick={handleBack}>
                    <BackArrowIcon />
                </div>

                <div className={styles.typePickerBlock}>
                    {isShort ? (
                        <button style={{ backgroundColor: "rgba(255, 45, 85, 1)" }}>Short</button>
                    ) : (
                        <button style={{ backgroundColor: "var(--color-green)" }}>Long</button>
                    )}
                </div>
            </div>

            <div className={styles.titles}>
                <div className="gr-title">Create pool</div>
                <div className="gr-subtitle">Start your own custom trading pool</div>
            </div>

            <div className={styles.fee}>
                <p style={{ fontSize: 13 }} className="gr-title">
                    Creator fee
                </p>

                <div className="tabs" style={{ marginTop: 0 }}>
                    <button onClick={() => handlePickValue(0)} className={feeValue === 0 ? "activeTab" : "tab"}>
                        None
                    </button>
                    <button onClick={() => handlePickValue(1)} className={feeValue === 1 ? "activeTab" : "tab"}>
                        10%
                    </button>
                    <button onClick={() => handlePickValue(2)} className={feeValue === 2 ? "activeTab" : "tab"}>
                        25%
                    </button>
                </div>
            </div>

            <div className={styles.pricing}>
                <div className="tabs">
                    <button onClick={() => handlePickPricing(true)} className={isMarketPrice ? "activeTab" : "tab"}>
                        Market
                    </button>
                    <button onClick={() => handlePickPricing(false)} className={isMarketPrice ? "tab" : "activeTab"}>
                        Limit
                    </button>
                </div>
            </div>

            {!isMarketPrice && (
                <div className={styles.inputBlock}>
                    <p style={{ fontSize: 13, marginTop: 10 }} className="gr-title">
                        Input price
                    </p>

                    <input
                        type="number"
                        disabled={isMarketPrice}
                        value={price}
                        onChange={handleChangePrice}
                        className={styles.input}
                    />
                </div>
            )}
            <div className={styles.inputBlock}>
                <p style={{ fontSize: 13, marginTop: 10 }} className="gr-title">
                    Input margine amount
                </p>

                <input
                    type="text"
                    className={styles.input}
                    value={marginAmountValue}
                    onChange={handleChangeMarginAmount}
                />
            </div>

            <div className={styles.leverageBlock}>
                <div
                    style={{
                        fontSize: 13,
                        marginTop: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    className="gr-title"
                >
                    Leverage
                    <p className={styles.leverageValue}>{leverageValue}</p>
                </div>

                <div className={styles.leverageWrapper}>
                    <input
                        type="range"
                        min={1}
                        className={styles.slider}
                        max={100}
                        value={leverageValue}
                        onChange={handleChangeLeverage}
                        style={{
                            background: `linear-gradient(to right, var(--color-yellow) ${leverageValue}%, #1e1e1e ${leverageValue}%)`,
                        }}
                    />

                    <div className={styles.lore}>
                        <span>x1</span>
                        <span>x25</span>
                        <span>x50</span>
                        <span>x75</span>
                        <span>x100</span>
                    </div>

                    <div className={styles.position}>
                        <p>Position Size:</p>
                        <span>{leverageValue * Number(price)} TON</span>
                    </div>

                    <div className={styles.sl}>
                        <div className={styles.sl_header}>
                            <h2 className="gr-subtitle">Stop Loss</h2>
                            <span>{price && stopLoss && `-${Number(price) * stopLoss} TON`}</span>
                        </div>
                        <div className="tabs">
                            {[0, 0.15, 0.25, 0.5, 0.75].map((sl, index) => (
                                <button
                                    onClick={() => setStopLoss(sl)}
                                    className={stopLoss === sl ? "activeTab" : "tab"}
                                    key={index}
                                >
                                    {sl ? `-${sl * 100}%` : "None"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sl}>
                        <div className={styles.sl_header}>
                            <h2 className="gr-subtitle">Stop Loss</h2>
                            <span>{price && stopLoss && `-${Number(price) * stopLoss} TON`}</span>
                        </div>
                        <div className="tabs">
                            {[0, 0.15, 0.25, 0.5, 0.75].map((tp, index) => (
                                <button
                                    onClick={() => setTakeProfit(tp)}
                                    className={takeProfit === tp ? "activeTab" : "tab"}
                                    key={index}
                                >
                                    {tp ? `+${tp * 100}%` : "None"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={styles.createButton}
                        onClick={handleCreatePool}
                    >
                        Create Pool
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default CreatePoolStep2;
