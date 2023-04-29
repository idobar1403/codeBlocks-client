import { useState, useEffect } from "react";
import Card from "./Card";
import fetchDataForButton from "../shared/Fetch_functions";
import CodeSnippet from "./CodeSnippet";

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
        <CodeSnippet code={selectedCode} />
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
