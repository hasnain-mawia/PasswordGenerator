import React, { useCallback, useEffect, useState } from 'react'
import { FaCopy } from "react-icons/fa";

function PasswordGenerator() {
  const [lenght,setLength ] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const [status,setStatus] = useState(false)

    const passwordgenerate = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllowed) str += "0123456789"
        if(charAllowed) str += "!@#$%^&*()_-+=|\{}[]`~"

        for(let i=1;i<=lenght;i++){
            let char = Math.floor(Math.random()*str.length+1)
            pass += str.charAt(char)    
        }
        setPassword(pass)    
        
    },[lenght, numberAllowed, charAllowed, setPassword])
    
    useEffect(()=>{
        passwordgenerate()
    },[lenght, numberAllowed, charAllowed])

    const passwordClipBoard = useCallback(()=>{
        window.navigator.clipboard.writeText(password)
        setStatus(!status)
        setTimeout(()=>{
        setStatus(status)
        },1000)
    },[password])


    return (
      
    <div className='bg-gradient-to-r from-sky-500 to-indigo-500 h-screen py-20'>
    {status &&
        <div className='bg-[green] rounded-[10px] max-w-[600px] mx-auto text-center py-2 mb-2 z-10'>
      <p className='text-[22px] text-white'>Password Copied</p>  
    </div>}
    <div className='px-[50px] bg-white rounded-[30px] h-[60vh] max-w-[600px] mx-auto shadow-2xl flex flex-col items-center'>
        <div>
            <img className='w-[200px]' src={require('../assets/images/password.png')} alt="" />
        </div>
        <div className='text-center'>
        <h3 className='text-[32px] font-bold'>PASSWORD GENERATOR</h3>
        <p className='text-[15px] my-3'>Create Strong and secure password to keep your account safe online.</p>
        </div>

        <div className='grid grid-cols-[80%_Auto] w-full gap-3'>
            <input value={password} className='border-[2px] border-[#2494EB] p-3 w-full rounded-[10px]' type="text" />
            <button onClick={passwordClipBoard} className='bg-[#2494EB] rounded-[10px] text-white flex items-center justify-center'>{!passwordClipBoard ? 'Copied': 'Copy'}<FaCopy className='mx-[5px]'/></button>
        </div>
            <p className='text-[18px] font-bold mt-2'>Password Length : {lenght}</p>
            <input value={lenght} onChange={(e:any)=> setLength(e.target.value)} className='border-[2px] border-[#2494EB] p-3 w-full rounded-[10px]' type="range" min={6} max={100} />
        <div className='flex justify-between w-full text-[19px]'>
         <label htmlFor="number">Numbers</label>
         <input defaultChecked={numberAllowed} onChange={()=> {setNumberAllowed((prev)=> !prev)}} className='w-[20px]' type="checkbox" id="number" name="number" value="number" />
        </div> 
        <div className='flex justify-between w-full text-[19px] my-5'>
         <label htmlFor="special-characters">Special Characters</label>
         <input defaultChecked={charAllowed} onChange={()=> {setCharAllowed((prev)=> !prev)}} className='w-[20px]' type="checkbox" id="special-characters" name="special-characters" value="special-characters" />
        </div> 
    </div>
    </div>
  )
}

export default PasswordGenerator
