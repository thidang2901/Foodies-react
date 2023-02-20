import React, { forwardRef } from "react"
import { ItemCard } from "../components"

import NotFound from "../assets/images/NotFound.svg"

const ItemListRow = forwardRef(({ className, data, flag = true }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex items-center my-12 gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap"
      } ${className}`}
    >
      {data && data.length > 0 ? (
        data.map((item) => <ItemCard key={item.id} data={item} />)
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="img-not-found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  )
})

export default ItemListRow
