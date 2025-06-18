// utils/flight_get.ts
export type FlightData = {
  id: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  departure_date: string;
  arrival_date: string;
  price: number;
  seats_total: number;
  seats_available: number;
};

export async function getFlightFromId(flight_id: string): Promise<FlightData> {
  try {
    const res = await fetch(`http://localhost:5000/flights/get-flight-from-id?flight_id=${flight_id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch flight: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data as FlightData;
  } catch (error) {
    console.error("Error fetching flight:", error);
    throw error;
  }
}
