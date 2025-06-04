export async function deleteTicket(ticket_id: string): Promise<void> {
  const res = await fetch("http://localhost:5000/tickets/delete-ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticket_id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete ticket");
  }
}
