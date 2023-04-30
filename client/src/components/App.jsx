import { useState, useEffect } from "react";
import Card from "./Card";
import fetchDataForButton from "../shared/Fetch_functions";
import CodeSnippet from "./CodeSnippet";
import socket from "../socket/socket";
import "../assets/styles/App_styles.css";

const App = () => {
  const [listOfData, setListOfData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedCodeSolution, setSelectedCodeSolution] = useState(null);

  //create cards function
  const createCard = (props) => {
    return (
      <Card
        key={props._id}
        name={props.title}
        description={props.description}
        handleClick={() => handleCardClick(props.code, props.solution)}
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

  //handle click on button and replace page with code snippet and get solution
  const handleCardClick = (code, solution) => {
    setSelectedCode(code);
    setSelectedCodeSolution(solution);
  };

  //when clicking on home button we should go back to cards
  const handleHomeClick = () => {
    setSelectedCode(null);
    setSelectedCodeSolution(null);
  };

  //before disconnect close all sockets
  window.addEventListener("beforeunload", () => {
    socket.emit("disconnect");
  });

  return (
    <div className="container">
      <h1>Code Blocks</h1>
      {selectedCode ? (
        <CodeSnippet
          code={selectedCode}
          solution={selectedCodeSolution}
          socket={socket}
        />
      ) : (
        <div className="button-container">
          {listOfData.map((data) => createCard(data, handleCardClick))}
        </div>
      )}
      <footer>
        <button className="back-button" onClick={handleHomeClick}>
          <img
            className="home-button"
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Home"
          />
        </button>
      </footer>
    </div>
  );
};

export default App;
