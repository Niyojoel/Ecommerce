import { useProductContext } from '@/context/productContext'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Pagination = () => {
  const {page, lastPage, changePage} = useProductContext();


  return (
    <div className='pagination'>
       {page > 1 && <button className="sort_paginate-btn paginate-btn" onClick={()=>changePage("prev")}>
            <AiOutlineArrowLeft/>
            Prev.
        </button>}
        <span>Page {page}/{lastPage} </span>
        {page < lastPage && <button className="sort_paginate-btn paginate-btn" onClick={()=>changePage("next")}>
            Next
            <AiOutlineArrowRight/>
        </button>}
    </div>
  )
}

export default Pagination