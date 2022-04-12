import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserSpace } from "./components/UserSpace";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import AllNotes from "./components/AllNotes";
import ViewNote from "./components/ViewNote";
import UserProfile from "./components/UserProfile";
import Tags from "./components/Tags";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<AllNotes showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              <Route exact path="/myspace" element={<UserSpace showAlert={showAlert} />}></Route>
              <Route exact path="/viewnote" element={< ViewNote showAlert={showAlert} />}></Route>
              <Route exact path="/user" element={< UserProfile showAlert={showAlert} />}></Route>
              <Route exact path="/tag" element={< Tags showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
