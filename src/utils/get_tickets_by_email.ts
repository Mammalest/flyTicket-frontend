export async function getTicketsById(passenger_email: string): Promise<String[]> {
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
}
