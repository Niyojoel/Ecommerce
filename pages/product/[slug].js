"use client"

import { Product } from "@/components";
import { useProductContext } from "@/context/productContext";
import Image from "next/image";
import { usePathname} from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";

const ProductDetails = () => {
  const { productList, productInCart} = useProductContext();
  const { addToCart } = productInCart();
    
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);

  const changeQuantity = (direction) => {
    direction === "inc"
      ? setQuantity((prev) => prev + 1)
      : quantity > 1
      ? setQuantity((prev) => prev - 1)
      : setQuantity(1);
  };

  useEffect(()=> {
    const slug = pathname?.split("/")[2];
    const product_ = productList.find(
      (product) => product.name === slug?.split("_").join(" ")
    );
    setProduct(product_);
  },[pathname, productList])

  console.log(product)
    
  return (
    product && (
      <div>
        <article className="product-detail-container">
          <div className="images-container">
            <div className="image-container">
              <Image
                src={product?.images && product?.images[index]}
                alt="product-image"
                width={300}
                height={300}
                className="product-detail-image"
              />
            </div>
            <div className="small-images-container">
              {product?.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="product-image"
                  width={70}
                  height={70}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
          <div className="product-detail-desc">
            <h1>{product?.name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>({product?.reviews})</p>
            </div>
            <h4>Details: </h4>
            <p>{product?.detail}</p>
            <div className="price-qty">
              <div className="priceRow">
                <h3>Price: </h3>
                <p className="price">${product?.price}</p>
              </div>
              <div className="quantity">
                <h3>Quantity: </h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={() => changeQuantity("dec")}>
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{quantity}</span>
                  <span className="plus" onClick={() => changeQuantity("inc")}>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
            </div>
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => {
                  addToCart(product, quantity);
                  setQuantity(1);
                }}
              >
                Add to Cart
              </button>
              <button className="buy-now" onClick={""}>
                Buy Now
              </button>
            </div>
            <p></p>
          </div>
        </article>
        <section className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {productList
                .filter(
                  (product_) =>
                    product_.category === product?.category ||
                    product_.material === product?.material
                )
                .map((product) => (
                  <Product key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default ProductDetails;
