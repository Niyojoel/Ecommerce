import { bannerContent } from "@/data/data";
import { HeroBanner, Product, FooterBanner, ProductsFilter, Pagination } from "@/components";
import { useProductContext } from "@/context/productContext";
// import {client} from "../lib/client";

const Home = (/*{productss, bannerData}*/) => {
  const {heroBanner, footerBanner}= bannerContent;

  const {products, filterTerms} = useProductContext();

  return (
    <main className="page">
      <HeroBanner {...heroBanner} />
      <section className="product-section">
        <div className="products-heading">
          <h2>Best Selling Items</h2>
          <p>Fashion in Diverse Styles Variations</p>
        </div>
        <ProductsFilter />
        <div className="products-container">
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
        <Pagination/>
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