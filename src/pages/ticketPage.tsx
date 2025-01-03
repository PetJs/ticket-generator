import { useLocation } from "react-router-dom";

function TicketPage() {
  const location = useLocation();
  const { name, email, github, avatar } = location.state || {};

  return (
    <div>
      <h1>Your Ticket</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>GitHub: {github}</p>
      {avatar && <img src={avatar} alt="Avatar" />}
    </div>
  );
}

export default TicketPage;
