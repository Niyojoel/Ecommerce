import { useProductContext } from "@/context/productContext";
import Link from "next/link";
import {AiOutlineShopping} from "react-icons/ai"
import {Cart} from "./";

const Navbar = () => {
  const {totalQty, showCart, setShowCart} = useProductContext();
  return (
    <div className="navbar-container">
      <p className="logo">
      <Link href="/" className="logo-text"> GALLANT STORE</Link>
      </p>
      <button type="button" className="cart-icon" onClick={()=> setShowCart(true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty"> {totalQty} </span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar