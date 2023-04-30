const fetchDataForButton = async () => {
  const response = await fetch("https://codeblocksserver.herokuapp.com/Codes");
  const data = await response.json();
  return data;
};

const fetchCodeByTitle = async (title) => {
  const response = await fetch(`https://codeblocksserver.herokuapp.com/Codes${title}`);
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    throw new Error(responseData.error);
  }
};

export default fetchDataForButton;

export { fetchCodeByTitle as fetchTitle };
