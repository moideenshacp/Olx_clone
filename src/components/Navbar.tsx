import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/setup";


const Navbar = () => {

    const [loginPop,setLoginPop] = useState(false)
    const [user,setUser ] = useState<User | null >(null)
    console.log(user?.displayName,'hiii');
    
    const navigate = useNavigate()

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        if(currentUser){
          setLoginPop(false)
          navigate('/')
        }
      })

      return ()=> unsubscribe()
    },[navigate])

    const handleSignOut = async ()=>{
      await signOut(auth)
    }
    const handleSell =async ()=>{
      if(user){
        navigate('/sell')
      }else{
        setLoginPop(true)
      }
    }


  return (
    <>
      <div className="flex p-4 shadow-md bg-slate-100">
        <img src={olx} className="w-11 h-7 mt-2" />
        <div className="flex border-2 border-spacing-1 w-64 p-2 border-black bg-white  ml-3 rounded-md">
          <img src={lens} className="w-6 h-5 mt-2" />
          <input type="text" placeholder="Location" className="ml-3 outline-none" />
          <img src={arrow} className="w-8 h-7 pt-2" />
        </div>

        <div className="flex h-14 ml-4 border-2 border-black rounded-md bg-white ">
          <input 
            type="text"
            placeholder="Find cars,Mobilephones and more..."
            className="ml-3 w-96 outline-none"
          />
          <img src={search} />
        </div>

        <div className="flex h-12 p-3 ml-10 cursor-pointer">
          <h1 className="font-semibold">ENGLISH</h1>
          <img src={arrow} className="w-8 h-7" />
        </div>
        {user ? (
          <div onClick={handleSignOut} className="flex h-12 p-3 ml-10 underline cursor-pointer hover:no-underline">
          <h1 className="font-bold text-lg">Logout</h1>
        </div>
        ):(
          
        <div onClick={()=>setLoginPop(!loginPop)} className="flex h-12 p-3 ml-10 underline cursor-pointer hover:no-underline">
        <h1 className="font-bold text-lg">Login</h1>
      </div>
        )
        }
        
        
        <div onClick={handleSell} className="flex h-12 p-2 ml-10 w-32 mt-2  cursor-pointer rounded-full border border-yellow-500">
          <h1 className="font-bold text-lg pl-4">+ SELL</h1>
        </div>
        

        {user?(
          <div className="flex h-12 p-2 ml-10 w-32 mt-2 font-bold">
          <h1>Welcome,{user?.displayName}</h1>
        </div>
        ):(
          <div></div>
        )}

      </div>
      {loginPop && <Login setLoginPop={setLoginPop}/>}
    </>
  );
};

export default Navbar;
