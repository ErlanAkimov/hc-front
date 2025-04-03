import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

export const wa = window.Telegram.WebApp;
export const isDesktop = ["tdesktop", "macos"].includes(wa.platform);

export const tgPaddingTop = { paddingTop: isDesktop ? "10px" : "var(--tg-top)" };

if (!["tdesktop", "macos", "unknown"].includes(wa.platform)) {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.requestFullscreen();
    window.Telegram.WebApp.enableClosingConfirmation();
    wa.disableVerticalSwipes();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <div className="telegram-wrapper">
                <App />
            </div>
        </Provider>
    </BrowserRouter>
);
