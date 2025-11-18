"use client"
import { useProductContext } from "@/context/productContext"
import { useEffect } from "react";

const productsFilter = () => {
    const {brandNames, categories, priceSortingRef, productFilterAndSorting, productFilterRef} = useProductContext();

    const {filterProducts, sortProductsByName, sortProductsByPrice} = productFilterAndSorting()

  return (
    <div className="product-showings_wrapper">
        <div className="products-showings" ref={productFilterRef}>
            <div className="product-sorting">
                <span> Sort by price:</span>
                <div className="showings-options">
                    <select defaultValue="default" ref ={priceSortingRef} onChange= {(e)=> sortProductsByPrice(e.target.value)}>
                        <option value="default">random</option>
                        <option value="asc">ascending</option>
                        <option value="des">descending</option>
                    </select>
                </div>
            </div>
            <div className="product-filter">
                <span> Filter :</span>
                <form className="showings-options" onChange={(e)=> filterProducts(e)}>
                    <select defaultValue="all" name="brandName" id="brandName">
                        <option value="all">all</option>
                        {brandNames?.map((name) => (
                        <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    <select defaultValue="all" name="category" id="category">
                        <option value="all" >all</option>
                        {categories?.map((category) => (
                        <option key= {category} value={category}>{category}</option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    </div>
  )
}

export default productsFilter