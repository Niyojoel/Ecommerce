import { bannerContent } from "@/data/data";
import { HeroBanner, Product, FooterBanner, ProductsFilter, Pagination } from "@/components";
import { useProductContext } from "@/context/productContext";
import { useEffect } from "react";

const Home = (/*{productss, bannerData}*/) => {
  const {heroBanner, footerBanner}= bannerContent;

  const {products, filterTerms, defaultProductsDisplay} = useProductContext();

  useEffect(()=> {
    defaultProductsDisplay()
  }, [])

  return (
    <main className="page">
      <HeroBanner {...heroBanner} />
      <section className="product-section">
        <div className="products-heading">
          <h2>Best Selling Items</h2>
          <p>Fashion in Diverse Styles and Variations</p>
        </div>
        <ProductsFilter />
        <div className="products-container">
          <div className="product_wrapper">
            {products.length ? (
              products?.map((product) => {
                return <Product key={product.id} product={product} />;
              })
            ) : (
              <p>
                {`No available item for ${
                  filterTerms.brandName !== "all" ? filterTerms.brandName : ""
                } ${filterTerms.category !== "all" ? filterTerms.category : ""}`}
              </p>
            )}
          </div>
        </div>
        <Pagination />
      </section>
      <FooterBanner footerBanner={footerBanner} />
    </main>
  );
}

// export const getServerSideProps = async ()=> {
//   const query = '*[_type == "product"]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   return {
//     props: { productss, bannerData },
//   };
// }

export default Home;