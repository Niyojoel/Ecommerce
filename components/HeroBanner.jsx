import Image from "next/image";
import Link from "next/link";
// import { urlFor } from "@/lib/client";

const HeroBanner = ({image, desc, product, buttonText, smallText, midText, largeText, xlargeText}) => {
  return (
    <section className="hero-banner-container">
        <div className="top-text">
            <p className="beats-solo">
                {smallText}
            </p>
            <h3> {midText} </h3>
        </div>
        <h1 className="style-text">{xlargeText.replace("able", " ").trim()}<span>ABLE</span></h1>
        <h1>{largeText}</h1>
         <Link href={`/product/${product}`}>
            <img src={/*urlFor(herobanner.image)*/image[0]} className="hero-banner-image2" alt="hero-img" />
         </Link>
         <Link href={`/product/${product}`}>
            <img src={image[1]} className="hero-banner-image" alt="hero-img" />
         </Link>
        <div className="whitebox-style"/>

        <div>
            <Link href={`/product/${product}`}> 
                <button type="button">
                    {buttonText}
                </button>
            </Link>
            <div className="desc">
                <h5>{desc}</h5>
            </div>
        </div>
    </section>
  )
}

export default HeroBanner
