import React from "react";
import styles from "./App.module.scss";
import Background from "./components/Background/Background";

import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Router from "./Router";
import Nav from "./components/Nav/Nav";
import SearchPool from "./components/Search/SearchPool";
import useAuthorization from "./components/hooks/useAuthorization";

const App: React.FC = () => {
    const [loading] = useAuthorization();

    if (loading) {
        return <LoadingPage />;
    } else {
        return (
            <div className={styles.App}>
                <SearchPool />
                <Background />
                <Router />
                <Nav />
            </div>
        );
    }
};

export default App;
