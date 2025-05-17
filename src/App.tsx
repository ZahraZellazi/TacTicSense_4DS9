import "./App.css";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Acceuil } from "./pages/Acceuil";
import { CoachGuard } from "./utils/CoachGuard";
import { PlayerGuard } from "./utils/PlayerGuard";
import type { ReactNode } from "react";

// Import des pages de prédiction
import { MarketValue } from "./pages//MarketValue";
import { GrowthPrediction } from "./pages/GrowthPrediction";
import { BestPosition } from "./pages/BestPosition";
import { InjuryDuration } from "./pages/InjuryDuration";
import { PostInjury } from "./pages/PostInjury";
 

function AuthRedirect({ children }: { children: ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user ? <Navigate to="/home" replace /> : children;
}

function RequireAuth() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Acceuil />} />
          
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <SignUp />
              </AuthRedirect>
            }
          />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            
            {/* Prediction routes */}
            <Route path="/market-value-page" element={<MarketValue/>} />
            <Route path="/growth-page" element={<GrowthPrediction/>} />
            <Route path="/best-position-page" element={<BestPosition />} />
            <Route path="/injury-duration-page" element={<InjuryDuration />} />
            <Route path="/post-injury-page" element={<PostInjury />} />
 

            {/* Coach-specific routes */}
            <Route element={<CoachGuard />}>
              <Route path="/coach-dashboard" element={<div>Coach Dashboard</div>} />
            </Route>

            {/* Player-specific routes */}
            <Route element={<PlayerGuard />}>
              <Route path="/player-dashboard" element={<div>Player Dashboard</div>} />
            </Route>
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;