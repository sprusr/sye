import React, { useCallback, useState, useRef } from 'react';
import Editor from 'react-medium-editor';
import './App.css';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState();
  const editor = useRef();
  const copy = useCallback(() => {
    editor.current.medium.elements[0].focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    document.activeElement.blur();
  }, [editor]);
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    
    const hidden = `
Dear Sir/Madam

This letter is not intended to to cause any embarrassment but just to contact your esteem self-following the knowledge of your high repute and trustworthiness.

I am Mohammed Abacha,the son of the late Nigerian Head of State who died on the 8th of June 1998.If you are conversant with world news,you would understand better,while I got your contacts through my personal research.Please,I need your assistance to make this happen and please; do not undermine it because it will also be a source of upliftment to you also.You have absolutely nothing to loose in assisting us instead, you have so much to gain.

The then head of state General Sani Abacha,transferred the money through a Lebanese businessman,Chagoury and a Jewish business man,Mark Rissar to bank accounts overseas,Instead,he used PERSONAL IDENTIFICATION NUMBERS (PIN) and declared the contents as Bearer Bonds and Treasury Bills. Also the firm issued him with a certificate of deposit of the consignments notes, which I have these information in my custody now.

You must have heard over the media reports and the Internet on the recovery of various huge sums of money deposited by my late father in different Banks and security firms abroad. Some of these banks and security firms willingly gave-/divulge their banking secrets and disclosed to the present civilian administration of Chief Olusegun Obasanjo,about my family's cash lodgement and monetary transactions with them.

Please my dear,I repose great confidence in you and I hope you will not betray my confidence in you.I have secretly deposited the sum of $30,000,000.00 with a security firm abroad whose name is withheld for now until we open communications.The money is contained in a metal box consignment with Security Deposit Number 009GM.

I shall be grateful if you could receive this fund into your Bank account for safekeeping. This arrangement is known to you and my junior brother (Abbas) only. So I will deal directly with you.I am proposing a 20% share of the fund to you for your kind assistance.I shall provide for you all the documents of the fund deposit with the security firm, and raise a power of attorney to enable you claim and receive this fund into your bank account.I have done a thorough homework and fine-tuned the best way to create you as the beneficiary to the funds and effect the transfer accordingly.Is rest assured that the modalities I have resolved to finalize the entire project guarantees our safety and the successful transfer of the funds.So, you will be absolutely right when you say that this project is risk free and viable.If you are capable and willing to assist, contact me at once via email with following details:

1. YOUR NAME
2. POSTAL ADDRESS
3. PHONE AND FAX NUMBERS

Also this transaction demands absolute confidentiality.On no condition must you disclose it to anybody irrespective of your relation with the person.Remember,Loose lips sinks ship.I am looking forward to your urgent and positive response via my email address above.

Best Regards,

Mohammed Abacha.
`;

    setResult(`<p>${input}</p><p style="color:white;font-size:0;">${hidden}</p>`);
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
            options={{ toolbar: { buttons: ['bold', 'italic', 'underline'] } }}
          />
        </div>}
    </div>
  </div>
)};

export default App;
