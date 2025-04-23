import React, { useEffect, useRef, useState } from "react";
import styles from "./Pool.module.scss";

import TradingViewChart from "./TradingViewChart";
import { CommentsIcon, LifeTimeIcon, PersonIcon, ShareIcon } from "../../components/icons";
import { AnimatePresence, motion } from "motion/react";
import useSwipeBack from "../../components/hooks/useSwipeBack";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CustomKeyboard from "../../components/CustomKeyboard/CustomKeyboard";
import { assetImages } from "../Homepage/components/Pools/PoolCard";
import AddCommentModal from "../../components/AddCommentModal/AddCommentModal";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, toNano } from "@ton/core";
import TxInProgress from "./TxInProgress";

const Pool: React.FC = () => {
    const [pool, setPool] = useState<IPool | null>(null);
    const [currentList, setCurrentList] = useState<number>(0);
    const [comments, setComments] = useState<ICommentItem[] | null>(null);
    const [transactions, setTransactions] = useState<IPoolTransaction[] | null>([]);
    const [addCommentModal, setAddCommentModal] = useState<boolean>(false);
    const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);
    const [tc] = useTonConnectUI();
    const wallet = useTonWallet();
    const [txInProgress, setTxInProgress] = useState<boolean>(false);

    const location = useLocation();
    useSwipeBack();

    const handleAddComment = (newComment: ICommentItem) => {
        if (!comments) return;

        comments.push(newComment);
    };

    useEffect(() => {
        const pool_id = location.pathname.split("pool/")[1];
        axios
            .get(`https://api.hash-cash.io/v1/positions/${pool_id}/`, {
                headers: {
                    Authorization: `Token ${sessionStorage.getItem("authToken")}`,
                },
            })
            .then((res) => {
                setPool(res.data);
                axios
                    .get(`https://api.hash-cash.io/v1/pool-transactions/${pool_id}`)
                    .then((a) => setTransactions(a.data.pool_transactions));
                axios
                    .get(`https://api.hash-cash.io/v1/new_comments/${pool_id}`)
                    .then((commentsResponse) => setComments(commentsResponse.data.comments));
            });
    }, []);

    const handleJoinPool = async (value: string) => {
        if (!pool) return;
        if (!wallet) return tc.openModal();

        tc.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 300,
            messages: [
                {
                    address: Address.parse(pool.wallet_address).toString({ bounceable: false }),
                    amount: toNano(value).toString(),
                },
            ],
        });
    };

    return (
        <div className={styles.pool}>
            <AnimatePresence>
                {pool && addCommentModal && (
                    <AddCommentModal
                        pool_id={pool.id}
                        handleAddComment={handleAddComment}
                        setAddCommentModal={setAddCommentModal}
                    />
                )}

                {txInProgress && <TxInProgress setIsClose={setTxInProgress} />}
            </AnimatePresence>
            <CustomKeyboard isOpen={keyboardIsOpen} setIsOpen={setKeyboardIsOpen} handleAction={handleJoinPool} />
            <div className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.imgBlock}>{pool && <img src={assetImages[pool.base_asset]} alt="" />}</div>
                    <div>
                        <p className={styles.name}>{pool && pool.base_asset}</p>
                        {pool && (
                            <p
                                className={styles.type}
                                style={{
                                    color:
                                        pool.limit_price > pool.stop_loss
                                            ? "rgba(49, 209, 88, 1)"
                                            : "rgba(255, 45, 85, 1)",
                                }}
                            >
                                {pool.limit_price > pool.stop_loss ? "Long" : "Short"}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.headerContent}>
                    <div>
                        <p className={styles.grey_text}>
                            Price{" "}
                            <span>
                                {pool &&
                                    (Number(pool.limit_price) > 99
                                        ? Number(pool.limit_price).toFixed(2)
                                        : Number(pool.limit_price).toFixed(4))}
                            </span>
                        </p>
                        <p className={styles.grey_text}>
                            SL{" "}
                            {pool && (
                                <span style={{ color: "rgba(255, 45, 85, 1)" }}>{`-${Math.abs(
                                    ((Number(pool.stop_loss) - Number(pool.limit_price)) / Number(pool.limit_price)) *
                                        100 *
                                        Number(pool.leverage)
                                ).toFixed(0)}%`}</span>
                            )}
                        </p>
                    </div>

                    <div>
                        <p className={styles.grey_text}>
                            Pool <span>{pool && formatNumber(Number(pool.amount))}</span>
                        </p>
                        <p className={styles.grey_text}>
                            TP{" "}
                            {pool && (
                                <span style={{ color: "rgba(49, 209, 88, 1)" }}>{`+${Math.abs(
                                    ((Number(pool.take_profit) - Number(pool.limit_price)) / Number(pool.limit_price)) *
                                        100 *
                                        Number(pool.leverage)
                                ).toFixed(0)}%`}</span>
                            )}
                        </p>
                    </div>
                </div>
                <div className={styles.pro}>
                    <div className={styles.ball}></div>
                    <p>Pro</p>
                </div>
            </div>

            <div className={styles.chart}>
                <TradingViewChart asset={"TON"} />
            </div>

            <div className={styles.inBtns}>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setKeyboardIsOpen(true)}>
                    In
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => {}}>
                    Out
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }}>
                    <ShareIcon />
                </motion.button>
            </div>
            <div className={styles.poolProgress}>
                {pool && (
                    <span>
                        {formatNumber(Number(pool.amount_raised))} / {formatNumber(Number(pool.amount))}{" "}
                        {pool.base_asset}
                    </span>
                )}
            </div>

            <div className={styles.poolCreator}>
                <div className={styles.tside}>
                    <div className={styles.lside}>
                        {pool && <img src={pool.creator_image} alt="" />}
                        <div>
                            <p className={styles.name}>{pool && pool.creator_username}</p>
                            <p className={styles.role}>Creator</p>
                        </div>
                    </div>
                    <div>
                        <p className={styles.lifetime}>
                            <LifeTimeIcon /> <span>{pool && formatDate(pool.created_at)}</span>
                        </p>
                        <p className={styles.fee}>
                            Fee: <span>{pool && pool.creator_fee}</span>
                        </p>
                    </div>
                </div>
                <div className={styles.bside}>
                    <p>
                        <PersonIcon /> {transactions ? transactions.length : ""}
                    </p>
                    <p>
                        <CommentsIcon /> {comments ? comments.length : ""}
                    </p>
                </div>
            </div>

            <div className="tabs">
                <button onClick={() => setCurrentList(0)} className={currentList === 0 ? "activeTab" : "tab"}>
                    Transactions
                </button>
                <button onClick={() => setCurrentList(1)} className={currentList === 1 ? "activeTab" : "tab"}>
                    Comments
                </button>
            </div>

            {currentList === 0 && (
                <div className={styles.listBlock}>
                    <div className={styles.listHeader}>
                        <h1 className="gr-title">Pool transactions</h1>
                        <div className={styles.poolTxInfo}>
                            <p>
                                <PersonIcon fill="var(--color-yellow)" /> {transactions && transactions.length}
                            </p>
                            <p>{pool && Number(pool.amount_raised).toFixed(2)} TON</p>
                        </div>
                    </div>

                    <div className={styles.list}>
                        {pool &&
                            transactions &&
                            (transactions.length === 0 ? (
                                <p className={"gr-subtitle"}>There is no transactions yet</p>
                            ) : (
                                transactions.map((tx, index) => (
                                    <TransactionItem asset={pool.base_asset} tx={tx} key={index} />
                                ))
                            ))}
                    </div>
                </div>
            )}

            {currentList === 1 && (
                <div className={styles.listBlock}>
                    <div className={styles.listHeader}>
                        <h1 className="gr-title">Comments</h1>
                        <motion.button
                            onClick={() => setAddCommentModal(true)}
                            whileTap={{ scale: 0.95 }}
                            className={styles.addCommentBtn}
                        >
                            Add comment
                        </motion.button>
                    </div>

                    <div className={styles.list}>
                        {comments &&
                            (comments.length === 0 ? (
                                <p className="gr-subtitle">There is no comments yet</p>
                            ) : (
                                comments.map((comment, index) => <CommentItem comment={comment} key={index} />)
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pool;

function formatNumber(n: number): string {
    if (n < 10) return n.toString();
    if (n < 1000) return n.toFixed(2);
    const formatted = (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1);
    return `${formatted}К`;
}

function TransactionItem({ tx }: { asset: string; tx: IPoolTransaction }) {
    return (
        <div className={styles.txItem}>
            <div className={styles.lside}>
                <div className={styles.imgBlock}>
                    <img src={tx.photo_url} alt="" />
                </div>
                <p className={styles.username}>{tx.username || "Username hidden"}</p>
            </div>

            <p className={styles.txAmount}>+{Number(tx.amount).toFixed(2)} TON</p>
        </div>
    );
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

function CommentItem({ comment }: { comment: ICommentItem }) {
    const [textHided, setTextHided] = useState<boolean>(true);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkTextLength = () => {
            if (textRef.current) {
                const textHeight = textRef.current.scrollHeight;
                setTextHided(textHeight > 28);
            }
        };

        checkTextLength();
    }, [comment.text]);

    return (
        <div className={styles.comment}>
            <p className={styles.time}>{formatDate(comment.created_at)}</p>
            <div className={styles.imgBlock}>
                <img src={comment.photo_url} alt="" />
            </div>
            <div className={styles.content}>
                <p className={styles.username}>{comment.username || "Username hidden"}</p>
                <p ref={textRef} className={textHided ? styles.expanded : styles.commentText}>
                    {comment.text}
                </p>

                {textHided && (
                    <button className={styles.showAll} onClick={() => setTextHided(false)}>
                        Show more
                    </button>
                )}
            </div>
        </div>
    );
}

export interface IPool {
    wallet_address: string;
    created_at: string;
    id: string;
    limit_price: string;
    amount: string;
    stop_loss: string;
    take_profit: string;
    amount_raised: string;
    base_asset: string;
    leverage: string;
    creator_username: string;
    creator_image: string;
    creator_fee: string;
}

export interface ICommentItem {
    id: string;
    pool_id: string;
    created_at: string;
    user_id: string;
    username: string;
    photo_url: string;
    text: string;
}

export interface IPoolTransaction {
    amount: number;
    username: string;
    photo_url: string;
    tx_hash?: string;
}
