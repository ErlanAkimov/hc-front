import React from "react";
import styles from "./Header.module.scss";
import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

interface Props {
    isBlueBtn?: boolean;
}

const Header: React.FC<Props> = ({ isBlueBtn }) => {
    const walletAddress = useTonAddress(true);
    const wallet = useTonWallet();
    const [tc] = useTonConnectUI();

    const handleTonConnect = () => {
        if (wallet) return tc.disconnect();
        tc.openModal();
    };

    if (isBlueBtn) {
        return (
            <>
                {wallet ? (
                    <div className={styles.header}>
                        <div>
                            <div className={styles.lside}>
                                <div className={styles.ava}>
                                    <img src={window.Telegram.WebApp.initDataUnsafe.user.photo_url} alt="" />
                                </div>
                                <div className={styles.header_content}>
                                    <p className={styles.username}>
                                        {window.Telegram.WebApp.initDataUnsafe.user.username}
                                    </p>
                                    <p className={styles.walletAddress}>
                                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleTonConnect}
                            className={wallet ? styles.disconnectBtn : styles.connectBtn}
                        >
                            {wallet ? "Disconnect" : "Connect wallet"}
                        </button>
                    </div>
                ) : (
                    <button className={styles.connect_button} onClick={handleTonConnect}>
                        Connect wallet
                    </button>
                )}
            </>
        );
    } else {
        return (
            <div className={styles.header}>
                <div>
                    <div className={styles.lside}>
                        <div className={styles.ava}>
                            <img src={window.Telegram.WebApp.initDataUnsafe.user.photo_url} alt="" />
                        </div>
                        <div className={styles.header_content}>
                            <p className={styles.username}>{window.Telegram.WebApp.initDataUnsafe.user.username}</p>
                            <p className={styles.walletAddress}>
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </p>
                        </div>
                    </div>
                </div>

                <button onClick={handleTonConnect} className={wallet ? styles.disconnectBtn : styles.connectBtn}>
                    {wallet ? "Disconnect" : "Connect wallet"}
                </button>
            </div>
        );
    }
};

export default Header;
