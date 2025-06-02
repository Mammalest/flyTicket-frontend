import "./App.css";
import AdminFlightManagement from "./Pages/AdminFlightManagement";
import AddFlights from "./Pages/AddFlights";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="row">
        <Routes>
          <Route path="/" element={<AdminFlightManagement />} />
          <Route path="/addflights" element={<AddFlights />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
