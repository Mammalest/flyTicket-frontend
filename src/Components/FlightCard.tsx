import { useNavigate } from "react-router-dom";
import { deleteFlight } from "../utils/flight_delete";

type FlightCardProps = {
  id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_total: number;
  seats_available: number;
  is_admin: boolean;
};

function FlightCard({
  id,
  from,
  to,
  departure_time,
  arrival_time,
  price,
  seats_total,
  seats_available,
  is_admin,
}: FlightCardProps) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteFlight(id);
      alert("Flight deleted successfully");
      // not refreshing the flight list
    } catch (error) {
      alert("Failed to delete flight: " + (error as Error).message);
    }
  };

  return (
    <div className="card h-100 mb-3 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {from} → {to}
        </h5>
        <p className="card-text mb-4">
          <strong>ID:</strong> {id} <br />
          <strong>Departure:</strong>{" "}{new Date(departure_time).toLocaleString()} 
          <br />
          <strong>Arrival:</strong> {new Date(arrival_time).toLocaleString()}{" "}
          <br />
          <strong>Price:</strong> {price}₺ <br />
          <strong>Seats:</strong> {seats_available} / {seats_total}
        </p>
        {is_admin ? (
          <div className="row">
            <div className="col">
              <button  type="button"  className="btn btn-primary w-100" onClick={() => navigate(`/editflight/${id}`)}>
                Edit
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <a href="#" className="btn btn-primary mt-auto">
            Book Now
          </a>
        )}
      </div>
    </div>
  );
}

export default FlightCard;
