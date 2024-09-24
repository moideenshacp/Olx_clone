import { Link } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { useEffect } from "react"



const Home = () => {
  const {products,fetchProducts} = useProducts()

  useEffect(()=>{
    fetchProducts()
  },[fetchProducts])


  return (
    <div className="grid grid-cols-4 p-5">
        {products.map(product=>(
          <Link to={`/details/${product.id}`}>
            <div key={product.id} className="border border-spacing-1 p-2 ml-3 mt-3">
            <img src={product.imageUrl} className="w-96 h-60" />
            <h1 className="font-bold text-xl">${product.price}</h1>
            <h1>{product.title}</h1>           
            </div>
            </Link>
        ))}
    </div>
  )
}

export default Home