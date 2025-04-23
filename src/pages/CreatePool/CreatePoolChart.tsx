import React from "react";
import styles from "./CreatePoolChart.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BackArrowIcon } from "../../components/icons";
import TradingViewChart from "../Pool/TradingViewChart";

const CreatePoolChart: React.FC = () => {
    const [params] = useSearchParams();
    const asset = params.get("asset");

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.backHeader}>
                <div className={styles.backIconBlock} onClick={handleBack}>
                    <BackArrowIcon />
                </div>
            </div>

            <div className={styles.chart}>
                {asset ? <TradingViewChart asset={asset} /> : <div style={{ color: "white" }}>Error</div>}
            </div>
            <div className={styles.btns}>
                <Link to={`/create-pool/step-3?asset=${asset}&isShort=false`}>Long</Link>
                <Link to={`/create-pool/step-3?asset=${asset}&isShort=true`}>Short</Link>
            </div>

            <div className={styles.ask}>
                <div className="gr-title">Ask AI</div>
                <button>
                    Generate comments <span>soon</span>
                </button>
            </div>
        </div>
    );
};

export default CreatePoolChart;
