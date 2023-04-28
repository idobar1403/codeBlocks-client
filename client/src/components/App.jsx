import { useState, useEffect } from "react";
import Card from "./Card_component";
import fetchDataForButton from "../shared/fetchFunctions";
import CodeSnippet from "./Code_snippet"


const App = () => {
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

  const [listOfData, setListOfData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);

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
    console.log(code);
    setSelectedCode(code);
  };

  return (
    <div>
      <h1>Code Blocks</h1>
      {selectedCode ? (
        <CodeSnippet code={selectedCode} />
      ) : (
        //iterate over the data and create cards from data
        <div className="button-container">
          {listOfData.map((data) => createCard(data, handleClick))}
        </div>
      )}
    </div>
  );
};

export default App;
