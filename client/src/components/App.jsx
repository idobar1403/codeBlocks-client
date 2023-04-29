import { useState, useEffect } from "react";
import Card from "./Card";
import fetchDataForButton from "../shared/Fetch_functions";
import CodeSnippet from "./CodeSnippet";
import { io } from "socket.io-client";

const socket = io("ws://localhost:8000",{ transports: ['websocket', 'polling', 'flashsocket'] });

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
  console.log("connected");
});

const App = () => {
  const [listOfData, setListOfData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);

  //create cards function
  const createCard = (props) => {
    return (
      <Card
        key={props._id}
        name={props.title}
        description={props.description}
        handleClick={() => handleClick(props.code)}
      />
    );
  };

  //for uploading the data of every exercise
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataForButton();
      setListOfData(data);
    }
    fetchData();
  }, []);

  //handle click on button and replace page with code snippet
  const handleClick = (code) => {
    ////change name
    setSelectedCode(code);
  };

  //when clicking on home button we should go back to cards
  const handleHomeClick = () => {
    setSelectedCode(null);
  };

  return (
    <div className="container">
      <h1>Code Blocks</h1>
      {selectedCode ? (
        <CodeSnippet code={selectedCode} socket={socket}/>
      ) : (
        <div className="button-container">
          {listOfData.map((data) => createCard(data, handleClick))}
        </div>
      )}
      <footer>
        <button className="back-button" onClick={handleHomeClick}>
          <img className="home-button" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" />
        </button>
      </footer>
    </div>
  );
};

export default App;
