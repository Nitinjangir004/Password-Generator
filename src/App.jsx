import { useState, useCallback ,useEffect,useRef } from 'react'
import './App.css'

  function App() {
    const [length, setlength] = useState(8);
    const [number,setnumber] = useState(false);
    const [character,setcharacter] = useState(false);
    const [password,setpassword] = useState("");

    const passwordref = useRef(null)

    const passwordgenertator = useCallback(() => {
      let pass = "";   
      let string  ="QWERTUIOPLKJGHGFDSAXCVBNMqwertyuioplkjhgfdsaxcvbnm";
      if (number){string += "1234567890"}
      if (character){string += "`~!@#$%^&*()}{]["}
      for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*string.length+1)
      pass +=  string.charAt(char)  
      }
      setpassword(pass);
    },[ length,number,character,setpassword])

    const copypassword = useCallback(() =>{
      passwordref.current?.select();
      passwordref.current?.setSelectionRange(0,password.length);
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{passwordgenertator()},[length,number,character,passwordgenertator])
    return (
      <>
       <div className="w-full h-screen bg-black flex items-center justify-center px-4">
  <div className="w-full max-w-md bg-gray-500 border rounded-md py-4 px-4">
    <h1 className="text-black text-2xl md:text-3xl text-center mb-4">Password Generator</h1>
    
    <div className="flex flex-col sm:flex-row gap-2 mb-5">
      <input
        className='flex-1 outline-none py-2 px-3 bg-white border rounded-md text-sm'
        type="text"
        value={password}
        placeholder='Password'
        readOnly
        ref={passwordref}
      />
      <button
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        onClick={copypassword}
      >
        Copy
      </button>
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-x-2">
        <input
          type="range"
          className="cursor-pointer"
          min={8}
          max={20}
          value={length}
          onChange={(e) => setlength(Number(e.target.value))}
        />
        <label className="text-white">Length: {length}</label>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="numberInput"
          checked={number}
          onChange={() => setnumber(prev => !prev)}
        />
        <label htmlFor="numberInput" className="text-white">Numbers</label>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="characterInput"
          checked={character}
          onChange={() => setcharacter(prev => !prev)}
        />
        <label htmlFor="characterInput" className="text-white">Characters</label>
      </div>
    </div>
  </div>
</div>

      </>
    )
  }

  export default App
