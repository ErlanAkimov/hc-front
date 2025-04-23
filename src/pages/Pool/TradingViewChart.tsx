import React, { useEffect, useRef, memo } from "react";

const TradingViewChart: React.FC<{ asset: string }> = ({ asset }) => {
    const container = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
			"autosize": true,
			"symbol": "${asset}USDT",
			"interval": "D",
			"timezone": "Etc/UTC",
			"theme": "dark",
			"style": "1",
			"locale": "ru",
			"allow_symbol_change": true,
			"hide_top_toolbar": true,
			"hide_volume": true,
			"support_host": "https://www.tradingview.com"
			}`;
        // @ts-ignore
        container.current.appendChild(script);
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div
                className="tradingview-widget-container__widget"
                style={{ height: "calc(100% - 32px)", width: "100%" }}
            ></div>
        </div>
    );
};

export default memo(TradingViewChart);
