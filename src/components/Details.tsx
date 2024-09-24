import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Product } from "../context/ProductContext";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProductById(id);
          if (productData) {
            setProduct(productData);
          } else {
            console.log('products not found');
            
          }
        } catch (error) {
          console.log(error);
          
        } 
      }
    };

    fetchProduct();
  }, [id, getProductById]);


  return (
    <div className="flex p-4">
      <img src={product?.imageUrl} alt={product?.title} className="w-96 h-96" />
      <div className="ml-4">
        <h1 className="font-bold text-3xl">${product?.price}</h1>
       
        <h2 className="mt-5">
          <span className="font-semibold">Title:</span> {product?.title}
        </h2>
        <h2 className="mt-5">
          <span className="font-semibold">Description:</span> {product?.description}
        </h2>
      </div>
    </div>
  );
};

export default Details;
