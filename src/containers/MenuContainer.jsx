import React, { useState } from "react"

import { CategoryCard, Heading, ItemListRow } from "@components"
import { useStateValue } from "@context"
import { categoriesData } from "@utils/data"

const MenuContainer = () => {
  const [{ foodItems }, dispatch] = useStateValue()
  const [categoryFilter, setCategoryFilter] = useState("chicken")

  return (
    <section id="menu" className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <Heading title="Our Hot Dishes" className="before:left-6" />

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categoriesData &&
            categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                data={category}
                isActive={categoryFilter === category.urlParamName}
                onClick={() => setCategoryFilter(category.urlParamName)}
              />
            ))}
        </div>

        <div className="w-full">
          <ItemListRow
            className="flex items-center justify-center"
            scrollable={false}
            items={foodItems?.filter((item) => item.category === categoryFilter)}
          />
        </div>
      </div>
    </section>
  )
}

export default MenuContainer
