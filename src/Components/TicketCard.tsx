type TicketCardProps = {
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

function TicketCard({
  ticket_id,
  flight_id,
  from,
  to,
  departure_time,
  arrival_time,
  departure_date,
  arrival_date,
  price,
  seats_total,
}: TicketCardProps) {
  return (
    <div className="card h-100 mb-3 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {from} → {to}
        </h5>
        <p className="card-text mb-4">
          <strong>Ticket ID:</strong> {ticket_id} <br />
          <strong>Flight ID:</strong> {flight_id} <br />
          <strong>Departure Date & Time:</strong>{" "}
          {new Date(`${departure_date}T${departure_time}`).toLocaleString()}
          <br />
          <strong>Arrival Date & Time:</strong>{" "}
          {new Date(`${arrival_date}T${arrival_time}`).toLocaleString()}
          <br />
          <strong>Price:</strong> ${price} <br />
          <strong>Seats Total:</strong> {seats_total}
        </p>
      </div>
    </div>
  );
}

export default TicketCard;
