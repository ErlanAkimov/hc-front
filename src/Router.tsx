import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import Frenspage from "./pages/Frenspage/Frenspage";
import Questspage from "./pages/Questspage/Questspage";
import Profilepage from "./pages/Profilepage/Profilepage";
import Pool from "./pages/Pool/Pool";
import CreatePool from "./pages/CreatePool/CreatePool";
import CreatePoolStep2 from "./pages/CreatePool/CreatePoolStep2";
import CreatePoolChart from "./pages/CreatePool/CreatePoolChart";

const Router: React.FC = () => {
    return (
        <div className="router">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/frens" element={<Frenspage />} />
                <Route path="/quests" element={<Questspage />} />
                <Route path="/profile" element={<Profilepage />} />
                <Route path="/pool/:id" element={<Pool />} />
                <Route path="/create-pool/step-1" element={<CreatePool />} />
                <Route path="/create-pool/step-2" element={<CreatePoolChart />} />
                <Route path="/create-pool/step-3" element={<CreatePoolStep2 />} />
            </Routes>
        </div>
    );
};

export default Router;
