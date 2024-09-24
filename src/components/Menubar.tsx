import React from "react"


const Menubar: React.FC = () => {
  return (
    <div className="flex shadow-md h-12 pt-3">
        <h1 className="ml-48">Car</h1>
        <h1 className="ml-5">Motorcycles</h1>
        <h1 className="ml-5">Mobile Phones</h1>
        <h1 className="ml-5">For Sale: Houses & Apartments</h1>
        <h1 className="ml-5">Scooters</h1>
        <h1 className="ml-5">Commercial & Other Vehicles</h1>
        <h1 className="ml-5">For Rent: Houses & Apartments</h1>
    </div>
  )
}

export default Menubar