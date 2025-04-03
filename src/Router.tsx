import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";

const Router: React.FC = () => {
    return (
        <div className="router">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
        </div>
    );
};

export default Router;
