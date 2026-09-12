import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GiveawayHome from "./pages/GiveawayHome/GiveawayHome";
import GiveawayDetails from "./pages/GiveawayDetails/GiveawayDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/giveaway" replace />}
        />

        <Route
          path="/giveaway"
          element={<GiveawayHome />}
        />

        <Route
          path="/giveaway/:id"
          element={<GiveawayDetails />}
        />

        <Route
          path="/login"
          element={<div>Login</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;