import { useState, useEffect } from "react";
import TicketCard from "../Components/TicketCard";
import { getTicketsById } from "../utils/get_tickets_by_email";

type TicketCard = {
  ticket_id: string;
  id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
};

type TicketPageProps = {
  passenger_email: string;
};

const Tickets_per_page = 40;

function TicketPage({ passenger_email }: TicketPageProps) {
  const [tickets, setTickets] = useState<TicketCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data: TicketCard[] = await getTicketsById(passenger_email)
        setTickets(data); // store in state
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [passenger_email]); // dependency array

  if (loading) return <div>Loading tickets...</div>;

  const totalPages = Math.ceil(tickets.length / Tickets_per_page);
  const startIndex = (currentPage - 1) * Tickets_per_page;
  const currentTickets = tickets.slice(startIndex, startIndex + Tickets_per_page);

  const rows = [];
  for (let i = 0; i < currentTickets.length; i += 4) {
    rows.push(currentTickets.slice(i, i + 4));
  }

  return (
    <div className="container-fluid">
      {rows.map((rowTickets, rowIndex) => (
        <div className="row mb-3" key={rowIndex}>
          {rowTickets.map((ticket) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              key={ticket.id}
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

export default TicketPage;
