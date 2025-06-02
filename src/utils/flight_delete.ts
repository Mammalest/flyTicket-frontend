export async function deleteFlight(id: string): Promise<void> {
  const res = await fetch("http://localhost:5000/flights/delete-flight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete flight");
  }
}
