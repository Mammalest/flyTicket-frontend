import { useState, useEffect } from "react";
import FlightCard from "./FlightCard";

type FlightCard = {
  id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_total: number;
  seats_available: number;
};

type FlightsGridProps = {
  isAdmin?: boolean;
  from: string;
  to: string;
  departure_date: string;
};

const FLIGHTS_PER_PAGE = 40;

function FlightsGrid({
  isAdmin = false,
  from,
  to,
  departure_date,
}: FlightsGridProps) {
  const [flights, setFlights] = useState<FlightCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/flights/get-flights");
        const data: FlightCard[] = await res.json();

        // Filter on client side
        const filtered = data.filter((flight) => {
          const matchesFrom = !from || flight.from === from;
          const matchesTo = !to || flight.to === to;
          const matchesDate =
            !departure_date ||
            new Date(flight.departure_time).toISOString().split("T")[0] ===
              departure_date;

          return matchesFrom && matchesTo && matchesDate;
        });

        setFlights(filtered);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, departure_date]); // refetch when inputs change

  if (loading) return <div>Loading flights...</div>;

  const totalPages = Math.ceil(flights.length / FLIGHTS_PER_PAGE);
  const startIndex = (currentPage - 1) * FLIGHTS_PER_PAGE;
  const currentFlights = flights.slice(
    startIndex,
    startIndex + FLIGHTS_PER_PAGE
  );

  const rows = [];
  for (let i = 0; i < currentFlights.length; i += 4) {
    rows.push(currentFlights.slice(i, i + 4));
  }

  return (
    <div className="container-fluid">
      {rows.map((rowFlights, rowIndex) => (
        <div className="row mb-3" key={rowIndex}>
          {rowFlights.map((flight) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              key={flight.id}
            >
              <FlightCard {...flight} is_admin={isAdmin} />
            </div>
          ))}
        </div>
      ))}

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <li
                key={pageNum}
                className={`page-item ${
                  pageNum === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{pageNum}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default FlightsGrid;
