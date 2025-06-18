import { useEffect, useState } from "react";
import { addFlight } from "../utils/flight_add";
import { useNavigate } from "react-router-dom";
import { fetchCities } from "../utils/cities_get";

type AvailabilityMessage = {
  text: string;
  isError: boolean;
} | null;

export default function AddFlights() {
  const [cities, setCities] = useState<string[]>([]);
  const navigate = useNavigate();
  // Left side inputs
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  useEffect(() => {
    fetchCities()
      .then((data) => {
        console.log("Fetched cities:", data);
        setCities(data);
      })
      .catch((err) => {
        console.error("Failed to fetch cities:", err);
      });
  }, []);

  // Right side inputs (integers only)
  const [seatsTotal, setSeatsTotal] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");

  const [availabilityMessage, setAvailabilityMessage] =
    useState<AvailabilityMessage>(null);
  const [loading, setLoading] = useState(false);

  const checkAvailability = () => {
    // Example: simple validations
    if (!from || !to) {
      setAvailabilityMessage({
        text: "Lütfen kalkış ve varış yerlerini seçin.",
        isError: true,
      });
      return;
    }
    if (!departureDate || !departureTime) {
      setAvailabilityMessage({
        text: "Lütfen kalkış tarih ve saatini girin.",
        isError: true,
      });
      return;
    }
    if (!arrivalDate || !arrivalTime) {
      setAvailabilityMessage({
        text: "Lütfen iniş tarih ve saatini girin.",
        isError: true,
      });
      return;
    }
    if (from === to) {
      setAvailabilityMessage({
        text: "Kalkış ve varış yerleri aynı olamaz.",
        isError: true,
      });
      return;
    }

    // Simulate availability check success
    setAvailabilityMessage({ text: "Uçuş uygun!", isError: false });
  };

  const handleAddFlight = async () => {
    setAvailabilityMessage(null);

    // Validate inputs
    if (
      !from ||
      !to ||
      !departureDate ||
      !departureTime ||
      !arrivalDate ||
      !arrivalTime ||
      seatsTotal === "" ||
      price === ""
    ) {
      setAvailabilityMessage({
        text: "Lütfen tüm alanları doldurun.",
        isError: true,
      });
      return;
    }

    try {
      setLoading(true);
      await addFlight(
        from,
        to,
        departureTime,
        departureDate,
        arrivalTime,
        arrivalDate,
        price as number,
        seatsTotal as number
      );
      console.log(from);
      console.log(to);
      console.log(departureTime);
      console.log(departureDate);
      console.log(arrivalTime);
      console.log(arrivalDate);
      console.log(price);
      console.log(seatsTotal);

      setAvailabilityMessage({
        text: "Uçuş başarıyla eklendi!",
        isError: false,
      });

      // Show alert, then navigate back to main page
      alert("Uçuş başarıyla eklendi!");
      navigate("/");

      // Reset form (optional if you navigate away)
      setFrom("");
      setTo("");
      setDepartureDate("");
      setDepartureTime("");
      setArrivalDate("");
      setArrivalTime("");
      setSeatsTotal("");
      setPrice("");
    } catch (error: any) {
      setAvailabilityMessage({
        text: error.message || "Uçuş eklenirken hata oluştu.",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper for integer inputs
  const handleIntegerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | "">>
  ) => {
    const val = e.target.value;
    if (val === "") {
      setter("");
      return;
    }
    // Only allow digits
    if (/^\d+$/.test(val)) {
      setter(Number(val));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Title above */}
      <h1 className="mb-4">FlyTicket Admin</h1>
      <h4 className="mb-4 pb-5">Flight Creation</h4>
      <div
        className="d-flex align-items-start border rounded bg-light shadow-sm ps-4 pe-4 pt-4 pb-4"
        style={{ height: "auto", maxWidth: "1500px", width: "100%" }}
      >
        {/* Left Column */}
        <div className="flex-grow-1 me-3">
          <div className="input-group mb-3">
            <label className="btn btn-outline-secondary" htmlFor="from">
              Nereden
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

            <label className="btn btn-outline-secondary" htmlFor="to">
              Nereye
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

          <div className="input-group mb-3">
            <label
              className="btn btn-outline-secondary"
              htmlFor="departureDate"
            >
              Kalkış Zamanı
            </label>
            <input
              type="date"
              className="form-control"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <input
              type="time"
              className="form-control"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />

            <label className="btn btn-outline-secondary" htmlFor="arrivalDate">
              İniş Zamanı
            </label>
            <input
              type="date"
              className="form-control"
              id="arrivalDate"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
            <input
              type="time"
              className="form-control"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
          </div>

          <div className="row mx-auto" style={{ maxWidth: "600px" }}>
            <div className="col">
              <button
                onClick={checkAvailability}
                className="btn btn-secondary w-100"
              >
                Check Availability
              </button>
              {availabilityMessage && (
                <div
                  className={`alert mt-2 ${
                    availabilityMessage.isError
                      ? "alert-danger"
                      : "alert-success"
                  }`}
                >
                  {availabilityMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="vr mx-3"></div>

        {/* Right Column */}
        <div className="pt-1 justify-content-center">
          <div className="input-group mb-3">
            <span className="input-group-text">Seats Total</span>
            <input
              className="form-control"
              aria-label="Seats Total"
              value={seatsTotal}
              onChange={(e) => handleIntegerChange(e, setSeatsTotal)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <input
              className="form-control"
              aria-label="Price"
              value={price}
              onChange={(e) => handleIntegerChange(e, setPrice)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <span className="input-group-text">₺</span>
          </div>
          <div className="justify-content-center">
            <button
              type="button"
              className="btn btn-primary w-50"
              onClick={handleAddFlight}
              disabled={loading}
            >
              {loading ? "Adding..." : "Set"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
