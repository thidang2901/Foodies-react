import React, { forwardRef } from "react"

import ItemCard from "./ItemCard"

import NotFound from "@/assets/images/NotFound.svg"

const ItemListRow = forwardRef(
  ({ className, items, scrollable = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`my-12 flex w-full items-center gap-3 scroll-smooth ${
          scrollable
            ? "overflow-x-scroll scrollbar-none"
            : "flex-wrap overflow-x-hidden"
        } ${className}`}
      >
        {items && items.length > 0 ? (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <img src={NotFound} alt="img-not-found" className="h-340" />
            <p className="my-2 text-xl font-semibold text-headingColor dark:text-primary">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    )
  }
)

export default ItemListRow
