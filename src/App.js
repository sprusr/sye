import React, { useCallback, useState, useRef } from 'react';
import Editor from 'react-medium-editor';
import spams from './spams';
import './App.css';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

const App = () => {
  const editor = useRef();
  
  const [input, setInput] = useState('');
  const [result, setResult] = useState();

  const copy = useCallback(() => {
    editor.current.medium.elements[0].focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    document.activeElement.blur();
  }, [editor]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const hidden = spams.aalto;
    setResult(`<p>${input}</p><br />${hidden}`);
  }, [input]);

  return (
    <div className="App">
      <div className="App-inner">
        <h1>Spam Your Email</h1>
        <p>Enter the message you want to send. We'll make sure it ends up in the recipient's spam folder. Then you can get angry at them for having not read it.</p>
        <form onSubmit={handleSubmit}>
          <div className="App-input">
            <textarea
              className="App-textarea"
              onChange={e => setInput(e.target.value)}
              placeholder="Put your email content here..."
              rows="8"
              value={input}
            />
            <input className="App-button" type="submit" value="Spam"></input>
          </div>
        </form>
        {result && result.length &&
          <div>
            <h2>Result <small><button onClick={copy}>Copy</button></small></h2>
            <p>Send the following as an HTML email:</p>
            <Editor className="App-result" ref={editor}
              tag="pre"
              text={result}
              onChange={() => {}}
              options={{ toolbar: { buttons: [] } }}
            />
          </div>}
      </div>
    </div>
  );
};

export default App;
