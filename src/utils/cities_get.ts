export async function fetchCities(): Promise<string[]> {
  try {
    const res = await fetch("http://localhost:5000/cities/get-all-cities");
    if (!res.ok) {
      throw new Error(`Failed to fetch cities: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data; // data is string[]
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
