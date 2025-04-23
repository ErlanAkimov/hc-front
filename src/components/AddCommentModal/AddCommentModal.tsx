import React, { useState } from "react";
import styles from "./AddCommentModal.module.scss";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { ICommentItem } from "../../pages/Pool/Pool";

interface Props {
    setAddCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
    pool_id: string;
    handleAddComment: (newComment: ICommentItem) => void;
}

const AddCommentModal: React.FC<Props> = ({ setAddCommentModal, pool_id, handleAddComment }) => {
    const user = useAppSelector((state) => state.user);
    const [commentText, setCommentText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const handleCloseModal = () => {
        setAddCommentModal(false);
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    const handleSendComment = () => {
        if (!commentText || commentText === "" || commentText.length < 4) {
            return;
        }

        axios
            .post(`https://api.hash-cash.io/v1/comments/`, {
                user_id: user.id,
                pool_id,
                text: commentText,
            })
            .then((res) => {
                const newComment = {
                    created_at: res.data.created_at,
                    id: res.data.id,
                    pool_id: res.data.pool_id,
                    text: commentText,
                    user_id: user.id,
                    username: user.username || "Username hidden",
                    photo_url: user.img,
                };
                handleAddComment(newComment);
                setMessage("Success");
                setTimeout(handleCloseModal, 1400);
            })
            .catch((error) => {
                console.log(error);
                setMessage("Error: something went wrong");
            });
    };
    return (
        <div className={styles.addCommentWrapper}>
            <motion.div
                onClick={handleCloseModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overlay"
            ></motion.div>
            <AnimatePresence>
                {message && (
                    <motion.div
                        className={styles.message}
                        initial={{ opacity: 0, top: -300 }}
                        animate={{ opacity: 1, top: 100 }}
                        exit={{ opacity: 0, top: -300 }}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                initial={{ top: 10, opacity: 0 }}
                animate={{ top: 0, opacity: 1 }}
                exit={{ top: -10, opacity: 0 }}
                className={styles.addCommentModal}
            >
                <div className={styles.modal_header}>
                    <div className={styles.imgBlock}>
                        <img src={window.Telegram.WebApp.initDataUnsafe.user.photo_url} alt="" />
                    </div>
                    <p className={styles.username}>Mitchi</p>
                </div>

                <input
                    value={commentText}
                    onChange={handleChangeText}
                    type="textarea"
                    placeholder="Insert your comment here"
                />
                <button className={styles.sendCommentBtn} onClick={handleSendComment}>
                    Add Comment
                </button>
            </motion.div>
        </div>
    );
};

export default AddCommentModal;
