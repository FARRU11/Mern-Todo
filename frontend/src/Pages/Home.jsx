import React, { useEffect, useState } from "react";
import ToDo from "../components/ToDo";
import axios from "axios";
import { baseURL } from "../utils/constant";
import Popup from "../components/Popup";

const Home = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        setToDos(res.data);
        setError("");
      })
      .catch(() =>
        setError("Could not reach the server. Check that the API is running.")
      )
      .finally(() => setLoading(false));
  }, [updateUI]);

  const saveToDo = () => {
    const text = input.trim();
    if (!text) return;
    axios
      .post(`${baseURL}/save`, { toDo: text })
      .then(() => {
        setUpdateUI((prev) => !prev);
        setInput("");
      })
      .catch(() => setError("Could not save the ToDo."));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">ToDo App</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveToDo()}
            type="text"
            maxLength={200}
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && !error && <p className="hint">Loading...</p>}
        {!loading && !error && toDos.length === 0 && (
          <p className="hint">Nothing to do yet. Add your first task!</p>
        )}

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
              setError={setError}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default Home;
