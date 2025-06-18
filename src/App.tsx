import AdminFlightManagement from "./Pages/AdminFlightManagement";
import AddFlights from "./Pages/AddFlight";
import EditFlight from "./Pages/EditFlight";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import SearchTicket from "./Pages/SearchTickets";
import TicketPage from "./Pages/TicketGrid"; // import your ticket display page
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="row">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/search-tickets" element={<SearchTicket />} />
          <Route path="/tickets" element={<TicketPage />} />

          <Route
            path="/admin-flight-management"
            element={<AdminFlightManagement />}
          />
          <Route path="/addflights" element={<AddFlights />} />
          <Route path="/editflight/:flight_id" element={<EditFlight />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
