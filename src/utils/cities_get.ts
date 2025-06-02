export async function fetchCities(): Promise<{ id: string; name: string }[]> {
  try {
    const res = await fetch("http://localhost:5000/cities/get-all-cities");
    if (!res.ok) {
      throw new Error(`Failed to fetch cities: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;  // Rethrow so caller can handle it if needed
  }
}
