import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="column">
      <button
        type="button"
        className="btn btn-danger w-100"
        onClick={() => navigate("/search-tickets")}
      >
        Search Tickets By Id
      </button>
      <button
        type="button"
        className="btn btn-danger w-100"
        onClick={() => navigate("/admin-login")}
      >
        Admin Login
      </button>
    </div>
  );
}
