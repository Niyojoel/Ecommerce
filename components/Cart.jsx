import { useProductContext } from "@/context/productContext";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AiOutlineDelete, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping,  } from "react-icons/ai";
import {TiDeleteOutline} from "react-icons/ti"


const Cart = () => {

  const {cart, totalPrice, totalQty, setShowCart, productInCart} = useProductContext();

  const{changeCartItemQuantity, removeItemFromCart} = productInCart();

  const cartRef = useRef();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-overlay" onClick={() => setShowCart(false)}/>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={()=> setShowCart(false)}>
          <AiOutlineLeft/>
          <span className="heading">
            Your Cart
          </span>
          <span className="cart-num-items">
            ({totalQty} items)
          </span>
        </button>

        {cart.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href={"/"}> 
              <button type="button" className="btn btn-shop" onClick={()=> setShowCart(false)}> 
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cart.length >= 1 && cart.map((item)=> (
            <div className="product" key={item.id}>
              <Image src={item.images[0]} alt="cart-product-image" width={80} height={80} className="cart-product-image"/>
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                     <p className="quantity-desc quantity-desc-cart">
                      <span className="minus" onClick={()=> changeCartItemQuantity("dec", item.id)}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num num-cart">
                        {item.quantity}
                      </span>
                      <span className="plus" onClick={()=> changeCartItemQuantity("inc", item.id)}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type="button" className="remove-item" onClick={()=> removeItemFromCart(item.id)}>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={" "}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart