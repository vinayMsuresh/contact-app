import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect } from "react";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
function App() {
  useEffect(() => {
    let arr = [
      {
        name: "Ajay V S",
        email: "jayvsajay@gmail.com",
        phone: "8310825075",
      },
      {
        name: "Akash PL",
        email: "plakash123@gmail.com",
        phone: "8090125075",
      },
    ];
    localStorage.setItem("contact", JSON.stringify(arr));
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:emailId" element={<EditContact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
