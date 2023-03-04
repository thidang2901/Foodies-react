import React, { forwardRef } from "react"

import ItemCard from "./ItemCard"

import NotFound from "@/assets/images/NotFound.svg"

const ItemListRow = forwardRef(({ className, items, scrollable = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex items-center my-12 gap-3 scroll-smooth ${
        scrollable ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"
      } ${className}`}
    >
      {items && items.length > 0 ? (
        items.map((item) => <ItemCard key={item.id} item={item} />)
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="img-not-found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">Items Not Available</p>
        </div>
      )}
    </div>
  )
})

export default ItemListRow
