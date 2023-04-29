const fetchDataForButton = async () => {
    const response = await fetch("http://localhost:3000/Codes");
    const data = await response.json();
  
    // const titlesAndDescriptions = data.map(({ _id, title, description }) => ({
    //   _id,
    //   title,
    //   description,
    // }));
    return data;
  }
  
  const fetchCodeByTitle = async (title) => {
    const response = await fetch(`http://localhost:3000/Codes/${title}`);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error);
    }
  }
  
  export default fetchDataForButton;
  
  export {fetchCodeByTitle as fetchTitle};