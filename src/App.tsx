import React from "react";
import styles from "./App.module.scss";
import Background from "./components/Background/Background";

// import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Router from "./Router";
import Nav from "./components/Nav/Nav";

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <Background />
            {/* <LoadingPage /> */}
            <Router />
            <Nav />
        </div>
    );
};

export default App;
