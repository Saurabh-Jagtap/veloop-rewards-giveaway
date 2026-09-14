import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GiveawayHome from "./pages/GiveawayHome/GiveawayHome";
import GiveawayDetails from "./pages/GiveawayDetails/GiveawayDetails";
import { Register } from "./pages/Auth/Register/Register";
import { Login } from "./pages/Auth/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/giveaway" replace />} />

        <Route path="/giveaway" element={<GiveawayHome />} />

        <Route path="/giveaway/:id" element={<GiveawayDetails />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;