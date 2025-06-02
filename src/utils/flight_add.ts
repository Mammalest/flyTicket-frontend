export async function addFlight(from: string, to: string, departure_time: string, departure_date: string, arrival_time: string, arrival_date: string, price: number,seats_total: number): Promise<void> {
  const departureDateTime = `${departure_date}T${departure_time}:00`;
  const arrivalDateTime = `${arrival_date}T${arrival_time}:00`;
  
  
  const res = await fetch("http://localhost:5000/flights/add-flight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({from, to, departureDateTime, arrivalDateTime, price, seats_total}),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete flight");
  }
}

//backend creates the id itself