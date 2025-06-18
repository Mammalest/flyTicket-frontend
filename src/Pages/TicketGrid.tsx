import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TicketCard from "../Components/TicketCard";
import { getTicketfomEmail } from "../utils/get_tickets_by_email";

export type TicketCardType = {
  ticket_id: string;
  flight_id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  departure_date: string;
  arrival_date: string;
  price: number;
  seats_total: number;
};

const TICKETS_PER_PAGE = 40;

export default function TicketPage() {
  const [searchParams] = useSearchParams();
  const passenger_email = searchParams.get("email") || "";

  const [tickets, setTickets] = useState<TicketCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!passenger_email) return; // No email? Don't fetch

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await getTicketfomEmail(passenger_email);
        setTickets(data);
        setCurrentPage(1); // reset page on new search
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [passenger_email]);

  if (!passenger_email) return <div>Please provide an email in the query parameter.</div>;

  if (loading) return <div>Loading tickets...</div>;

  const totalPages = Math.ceil(tickets.length / TICKETS_PER_PAGE);
  const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
  const currentTickets = tickets.slice(startIndex, startIndex + TICKETS_PER_PAGE);

  const rows = [];
  for (let i = 0; i < currentTickets.length; i += 4) {
    rows.push(currentTickets.slice(i, i + 4));
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Tickets for: {passenger_email}</h2>
      {rows.map((rowTickets, rowIndex) => (
        <div className="row mb-3" key={rowIndex}>
          {rowTickets.map((ticket) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              key={ticket.ticket_id}
            >
              <TicketCard {...ticket} />
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
                className={`page-item ${pageNum === currentPage ? "active" : ""}`}
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
