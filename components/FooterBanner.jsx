import Image from "next/image"
import Link from "next/link"

const FooterBanner = ({footerBanner: {image, desc, product, discount, buttonText, smallText, midText, largeText, xlargeText, salesTime}}) => {
  return (
    <section className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText}</h3>
          <h3>{xlargeText}</h3>
          <p>{salesTime}</p>
        </div>
        <div className="right">
          <p className="sale-object">{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <div className="footer-banner-imgbox">
          <Link href={`product/${product}`}>
            <Image src={image} alt="footer-banner-image" width={400} height={400} className="footer-banner-image"/>
          </Link>
          <div className="product-shadow"/>
        </div>
      </div>
    </section>
  )
}

export default FooterBanner