import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [allowedChar, setAllowedChar] = useState(false);
  const [allowedNum, setAllowedNum] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  function copyPasswordToClipboard(){
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  }

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (allowedNum) {
      chars += "0123456789";
    }
    if (allowedChar) {
      chars += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length+1);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, allowedNum, allowedChar,setPassword]);
  

  useEffect(() => {
    generatePassword();
  }, [allowedNum, allowedChar, length, generatePassword]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow-md rounded-lg px-2 py-3 bg-gray-700 ">
        <input
          type="text"
          className="outline-none w-full px-2 py-2 "
          placeholder="password"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button 
        className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-2"
        onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div className="flex">
        <div className="flex item-center mt-3">
          <input 
          type="range" 
          className="cursor-pointer accent-blue-500" 
          min="0"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex item-center mt-3 ml-3">
          <input 
          id="numAllowed"
          type="Checkbox"
          defaultChecked = {allowedNum}
          onChange={()=>setAllowedNum((prev) => !prev)} />
          <label>Number</label>
        </div>
        <div className="flex item-center mt-3 ml-3">
          <input 
          type="Checkbox" 
          id = "charAllowed"
          defaultChecked={allowedChar}
          onChange={()=>setAllowedChar((prev) => !prev)}/>
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
