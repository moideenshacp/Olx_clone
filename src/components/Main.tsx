import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import React from "react"

const Main: React.FC = () => {



  return (
    <div>
        <Navbar/>
        <Menubar/>
        <Home />

    </div>
    
    
  )
}

export default Main