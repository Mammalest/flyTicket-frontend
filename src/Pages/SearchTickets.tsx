import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchTicket() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    navigate(`/tickets?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="container mt-4">
      <h2>Search Tickets by Email</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}

        <button type="submit" className="btn btn-danger w-100">Search</button>
      </form>
    </div>
  );
}

