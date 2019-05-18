import React, { useCallback, useState, useRef } from 'react';
import Editor from 'react-medium-editor';
import spams from './spams';
import './App.css';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

const App = () => {
  const editor = useRef();
  
  const [input, setInput] = useState('');
  const [method, setMethod] = useState('aalto');
  const [result, setResult] = useState();

  const copy = useCallback(() => {
    editor.current.medium.elements[0].focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    document.activeElement.blur();
  }, [editor]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const hidden = spams[method];
    setResult(`<p>${input}</p><br />${hidden}`);
  }, [input, method]);

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
            <div className="App-method">
              <select value={method} onChange={e => setMethod(e.target.value)}>
                <option value="aalto">Aalto</option>
                <option value="whitetext">White Text</option>
              </select>
            </div>
            <div className="App-button">
              <input type="submit" value="Spam" />
            </div>
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
