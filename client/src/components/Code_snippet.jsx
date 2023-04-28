import React from "react";
import Highlight from "react-highlight"

const CodeSnippet = (props) => {
  return (
    <pre>
      <Highlight>
      <code contentEditable = "true" className="code-snippet"> {props.code}</code>
      </Highlight>
      
    </pre>
  );
};

export default CodeSnippet;