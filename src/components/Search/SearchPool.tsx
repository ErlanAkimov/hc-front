import React, { useState } from "react";
import styles from "./SearchPool.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SearchIcon } from "../icons";
import axios from "axios";
import { setSearchPoolModal } from "../../redux/slices/appSlice";

const SearchPool: React.FC = () => {
    const isOpen = useAppSelector((state) => state.app.searchPoolModal);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = axios.get(`https://api.hash-cash.io/v1/get-pools?name=${inputValue}`);
    };
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleClear = () => {
        setInputValue("");
    };

    const handleCloseModal = () => {
        dispatch(setSearchPoolModal(false));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.searchPoolWrapper}>
                    <motion.div
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        className={styles.overlay}
                        onClick={handleCloseModal}
                    />
                    <motion.form
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0, top: -15 }}
                        initial={{ opacity: 0, top: 15 }}
                        id="search-pool-form"
                        onSubmit={handleSubmit}
                        className={styles.modal}
                    >
                        <h1 className="gr-title">Search</h1>
                        <label className={styles.inputBlock}>
                            <SearchIcon />
                            <input value={inputValue} onChange={handleInput} type="text" placeholder="Search here" />
                            {inputValue && (
                                <div className={styles.clear} onClick={handleClear}>
                                    <Clear />
                                </div>
                            )}
                        </label>

                        <motion.button
                            form={"search-pool-form"}
                            whileTap={{ scale: 0.95 }}
                            className={styles.searchBtn}
                        >
                            Search
                        </motion.button>
                    </motion.form>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchPool;

function Clear() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}
