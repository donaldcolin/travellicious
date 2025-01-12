import React from "react";
import "./css/product.css";
import { useParams } from "react-router-dom";
import { treksData } from "./trekData";
import { ProductDisplay } from "../components/productdisplay/ProductDisplay";


export const ProductPage = () => {
  const { productId } = useParams();
  const product = treksData.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <ProductDisplay product={product} />
      
    
    </div>
  );
};