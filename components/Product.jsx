import { useProductContext } from "@/context/productContext";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react";

const Product = ({product}) => {
  const {cart} = useProductContext();

  const {id, name, category, price, desc, images}= product;

  const slug = name.split(" ").join("_")

  return (
    <article>
      <Link href={`/product/${slug}`}>
      <div className="product-card">
          {cart.find(product=> product.id === id) && <span className="in-cart">In cart</span>}
          <Image src={images && images[0]} alt="product-image" width={250} height={250} className="product-image"/>
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </article>
  )
}

export default Product