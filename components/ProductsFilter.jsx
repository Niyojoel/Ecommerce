"use client"
import { useProductContext } from "@/context/productContext"
import { useEffect } from "react";

const productsFilter = () => {
    const {brandNames, categories, priceSortingRef, productFilterAndSorting, productFilterRef} = useProductContext();

    const {filterProducts, sortProductsByName, sortProductsByPrice} = productFilterAndSorting()

  return (
     <div className="products-showings" ref={productFilterRef}>
        <div className="product-filter">
            <span> Filter Products</span>
            <form className="showings-options" onChange={(e)=> filterProducts(e)}>
                <div className="filter-by">
                <label htmlFor="brandName"> Brand : </label>
                <select defaultValue="all" name="brandName" id="brandName">
                    <option value="all">all</option>
                    {brandNames?.map((name) => (
                    <option value={name}>{name}</option>
                    ))}
                </select>
                </div>
                <div className="filter-by">
                <label htmlFor="category"> Category : </label>
                <select defaultValue="all" name="category" id="category">
                    <option value="all" >all</option>
                    {categories?.map((category) => (
                    <option key= {category} value={category}>{category}</option>
                    ))}
                </select>
                </div>
            </form>
        </div>
        <div className="product-sorting">
            <span> Sort Products </span>
            <div className="showings-options">
                <div className="sort-by">
                <label> By Price : </label>
                <select defaultValue="default" ref ={priceSortingRef} onChange= {(e)=> sortProductsByPrice(e.target.value)}>
                    <option value="default">any</option>
                    <option value="asc">ascending</option>
                    <option value="des">descending</option>
                </select>
                </div>
                <div className="sort-by">
                    <label> By Name : </label> 
                    <button className="sort_paginate-btn" onClick={sortProductsByName} type="button">
                        By Name
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default productsFilter