import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightsGrid from "../Components/FlightsGrid";
import { fetchCities } from "../utils/cities_get";

export default function AdminFlightManagement() {
  const [cities, setCities] = useState<string[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities()
      .then((data) => {
        console.log("Fetched cities:", data); // <-- Add this
        setCities(data);
      })
      .catch((err) => {
        console.error("Failed to fetch cities:", err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3">
        <h1 className="mb-0">Admin Flight Management</h1>
        <button
          onClick={() => navigate("/addflights")}
          className="btn btn-primary"
        >
          Add Flight
        </button>
      </div>
      <div className="row">
        {/* From City */}
        <div className="col-md-4 mb-3">
          <label className="input-group-text" htmlFor="from">
            From
          </label>
          <select
            className="form-select"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Seç...</option>
            {cities.map((cityName, idx) => (
              <option key={idx} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {/* To City */}
        <div className="col-md-4 mb-3">
          <label className="input-group-text" htmlFor="to">
            To
          </label>
          <select
            className="form-select"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Seç...</option>
            {cities.map((cityName, idx) => (
              <option key={idx} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="col-md-4 mb-3">
          <label className="input-group-text" htmlFor="departureDate">
            Departure Date
          </label>
          <input
            type="date"
            className="form-control"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
      </div>
      <FlightsGrid
        isAdmin={true}
        from={from}
        to={to}
        departure_date={departureDate}
      />
    </div>
  );
}
