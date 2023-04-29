import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

//const socket = io("ws://localhost:3000",{ transports: ['websocket', 'polling', 'flashsocket'] });

const CodeSnippet = (props) => {
    const [code, setCode] = useState(props.code);

  // receive a message from the server
  
  const editorRef = useRef(null);
  function onCodeChange(editor, monaco) {
    editorRef.current = editor;
    
    editorRef.current.onDidChangeModelContent(() => {
      const value = editorRef.current.getValue();
      props.socket.emit("send-message", value);
    });
  }

  function setNewCode(value) {
    setCode(value);
    // send the new code to the server using sockets
  }
  props.socket.on('update', (data)=> {
    // console.log(data);
    setNewCode(data);
    // console.log(data);
  })

  props.socket.on("set-read-only", val => {
    console.log("set read only");
    editorRef.current.updateOptions({ readOnly: true })
  });



  return (
    <div className="code-snippet">
      <Editor
        height="50vh"
        width="80vh"
        theme="vs-dark"
        onMount={onCodeChange}
        defaultLanguage="javascript"
        value={code}
        // defaultValue={code}
        // readOnly = "true"
      />
    </div>
    //     <pre>
    //       <Highlight>
    //       <code onInput={onCodeChange} contentEditable = "true" className = "code-snippet" dangerouslySetInnerHTML={{ __html: props.code }}
    // ></code>
    //       </Highlight>
    //     </pre>
  );
};

export default CodeSnippet;
