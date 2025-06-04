import { deleteTicket } from "../utils/ticket_delete";

type TicketCardProps = {
  ticket_id: string;
  id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
};

function TicketCard({
  ticket_id,
  id,
  from,
  to,
  departure_time,
  arrival_time,
}: TicketCardProps) {
  const handleDelete = async () => {
    try {
      await deleteTicket(ticket_id);
      alert(" Ticket deleted successfully");
      // not refreshing the flight list
    } catch (error) {
      alert("Failed to delete ticket: " + (error as Error).message);
    }
  };

  return (
    <div className="card h-100 mb-3 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {from} → {to}
        </h5>
        <p className="card-text mb-4">
          <strong>Ticket ID:</strong> {ticket_id} <br />
          <strong>ID:</strong> {id} <br />
          <strong>Departure:</strong>{" "}
          {new Date(departure_time).toLocaleString()}
          <br />
          <strong>Arrival:</strong> {new Date(arrival_time).toLocaleString()}{" "}
          <br />
        </p>
        <div className="col">
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={handleDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
