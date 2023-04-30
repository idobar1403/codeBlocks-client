import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import compareCode from "../shared/Code_comparing";
import "../assets/styles/Code_snippet_styles.css";
import { debounce } from 'lodash';


const CodeSnippet = (props) => {
  const [code, setCode] = useState(props.code);
  const [readOnlyState, setReadOnlyState] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const editorRef = useRef(null);
  function onCodeChange(editor, monaco) {
    editorRef.current = editor;

    //notify that the editor was swithced
    props.socket.emit("set-read-only-values");
    //if there are more than one client it will set the first one editor as read only
    props.socket.on("set-read-only", (...args) => {
      console.log("set read only");
      setReadOnly(true);
    });

    //listen to the server that tells when there are more than one client
    props.socket.on("set-read-only-false", (...args) => {
      console.log("set read only");
      setReadOnly(false);
    });

    //when the editor notice a change it will emit the changes
    //doing debounce here in order to handle multiple changes at once
    editorRef.current.onDidChangeModelContent(debounce(() => {
      const value = editorRef.current.getValue();
      setIsCorrect(compareCode(value, props.solution));
      props.socket.emit("send-message", value);
    }, 200));
  }

  //set the code and checks if the code equals the solution
  function setNewCode(value) {
    setCode(value);
    setIsCorrect(compareCode(code, props.solution));
  }

  function setReadOnly(value) {
    setReadOnlyState(value);
  }

  props.socket.on("update", (data) => {
    setNewCode(data);
  });

  return (
    <div className="code-snippet">
      <div>
        <Editor
          height="50vh"
          width="80vh"
          theme="vs-dark"
          onMount={onCodeChange}
          defaultLanguage="javascript"
          value={code}
          options={{ readOnly: readOnlyState }}
        />
      </div>
      <div>{isCorrect && <h1 style={{ fontSize: "50px" }}>😀</h1>}</div>
    </div>
  );
};

export default CodeSnippet;
