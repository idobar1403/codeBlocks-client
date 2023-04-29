import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeSnippet = (props) => {
  const editorRef = useRef(null);

  function onCodeChange(editor, monaco) {
    editorRef.current = editor;
    editorRef.current.updateOptions({ readOnly: true })
    alert(editorRef.current.getValue());
    // alert(editorRef.current.getEditorValue);
  }
  const getEditorValue = () => {
    alert(editorRef.current.getEditorValue());
  };

  return (
    <div className="code-snippet">
      <Editor
        height="50vh"
        width="80vh"
        theme="vs-dark"
        onMount={onCodeChange}
        defaultLanguage="javascript"
        defaultValue={props.code}
        readOnly = "true"
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
