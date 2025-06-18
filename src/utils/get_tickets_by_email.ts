export type TicketandFlightData = {
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

export async function getTicketfomEmail(email: string): Promise<TicketandFlightData[]> {
  try {
    const res = await fetch(`http://localhost:5000/ticket/get-tickets-from-email?email=${email}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data as TicketandFlightData[];  // Return as array
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}
