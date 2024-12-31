"use client"

import {useState, useContext, createContext, useRef, useEffect} from "react";
import { products as products_} from "@/data/data";
import toast from "react-hot-toast";

//Getting Product Brands
const getProductsClassification = (by)=> {
    return [...new Set(
    products_.map((product) => {
        if(by === "name") {
            return product[by].split(" ")[0];
        }
        return product[by]
    })
)]
}
const categories = getProductsClassification("category");
const brandNames = getProductsClassification("name");

const ProductContext = createContext(null);

export const ProductProvider = ({children})=> {
    const [productList, setProductList] = useState(products_)
    const [products, setProducts] = useState([])

    const [filterTerms, setFilterTerms] = useState({brandName: "", category: ""})

    const priceSortingRef = useRef(null);
    const productFilterRef = useRef(null);
    
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(null);
    
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    

    function paginationControl () {
        const pagination = (products)=> {
            const pagProduct = [...products]
            let limit = 10;
            let skip = (page - 1) * limit;
            let lastPage = Math.ceil(products.length/limit);
            setLastPage(lastPage);
            let sliceEnd  = page < lastPage ? page * limit : products.length;
            return pagProduct.slice(skip, sliceEnd);
        }
    
        const changePage = (direction) => {
            setPage(prev => direction ==="prev" ? prev - 1 : prev + 1);
            productFilterRef.current?.scrollIntoView(/*{behavior: "smooth"}*/);
        }
        return {pagination, changePage}
    };
    
    function productInCart (){
        //helpers
        const findCartItem = (id) => {
            return cart.find(item => item.id === id)
        };

        const sumTotalPriceAndQty = (cart)=> {
            const {price, quantity} = cart.reduce((total, product)=> {
                total.price += product.price * product.quantity;
                total.quantity += product.quantity;
                return total;
            },{
                price : 0,
                quantity: 0
            });
           
            setTotalPrice(price);
            setTotalQty(quantity);
        };

        const cartUtils = (updatedCart)=> {
            setCart(updatedCart);
            sumTotalPriceAndQty(updatedCart);
        };

        //functionality
        const addToCart = (product_, quantity) => {
            const alreadyExistProduct = findCartItem(product_.id);

            let updatedCart;

            if(alreadyExistProduct) {
                updatedCart = cart.map((item)=> {
                    if(item.id === product_.id) {
                        return item = {...item, quantity: item.quantity + quantity}
                    }
                    return item;
                });
            }else {
                updatedCart = [...cart, {...product_, quantity: quantity}];
            }
            
            cartUtils(updatedCart);
            toast.success(`${quantity} ${product_.name} added to the cart.`)
        };

        const changeCartItemQuantity = (direction, id)=> {
            const changedItem = findCartItem(id);

            if (changedItem.quantity === 1 && direction === "dec") {
                return removeItemFromCart(id);
            }

            const changedCart = cart.map((item)=> {
                if(item.id === id) {
                    item = {...item, quantity: direction === "inc" ? item.quantity + 1 : item.quantity - 1 }
                    return item;
                }
                return item;
            });

            cartUtils(changedCart);
        };

        const removeItemFromCart = (id)=> {
            const removedItem = findCartItem(id);
            const filteredCart = cart.filter((item)=> item.id !== id);
            cartUtils(filteredCart);
            toast.success(`${removedItem.name} has been removed from cart.`)
        };
        
        return {addToCart, changeCartItemQuantity, removeItemFromCart};
    }

    function productFilterAndSorting () {
        const filterProducts = (e)=> {
            setPage(1);
            //setting sorting back to default
            priceSortingRef.current.value = "default";

            //getting filter terms
            const formData = new FormData(e.currentTarget);
            const filterValues = Object.fromEntries(formData);

            setFilterTerms(filterValues);

            const {brandName, category} = filterValues;

            //Filtering based on terms
            setProductList((prev)=> {
                let checkArr = brandName === "all" || category === "all" ? products_ : prev; 

                console.log(checkArr)

                if(brandName !=="all") {
                    checkArr = checkArr.filter((product)=> product.name.includes(brandName))
                    console.log(checkArr)

                }
                if(category !=="all") {
                    checkArr = checkArr.filter((product)=> product.category === category)
                    console.log(checkArr)

                }
                return checkArr;
            });
        }

        const sortProductsByName = () => {
            setProductList( prev => {
            const checkArr = [...prev];
            return checkArr.sort((a, b)=> a.name.localeCompare(b.name))
            });
        };
        
        const sortProductsByPrice = (type) => {
            setProductList( prev => {
                const checkArr = [...prev];
                if(type === "asc") {
                    return checkArr.sort((a, b)=> a.price - b.price);
                }else if (type === "des") {
                    return checkArr.sort((a, b)=> b.price - a.price);
                }
                return checkArr;
            });
        };
        return {filterProducts, sortProductsByName, sortProductsByPrice}
    };

    const {pagination, changePage}= paginationControl ();

    useEffect(()=> {
        setProducts(pagination(productList));
    },[page, productList]);

    return <ProductContext.Provider value={{products, brandNames, categories, page,setPage, lastPage, priceSortingRef, productFilterRef, productFilterAndSorting, filterTerms, changePage, cart, totalPrice, totalQty, productInCart, showCart, setShowCart, productList}}>
        {children}
    </ProductContext.Provider>
}

export const useProductContext = ()=> {
    return useContext(ProductContext);
}