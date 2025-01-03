import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/formPage";
import TicketPage from "./pages/ticketPage";

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>
      </Router>
    );
  }

export default App;
