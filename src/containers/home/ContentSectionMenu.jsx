import React, { useState } from "react"

import { CategoryCard } from "@/components/Category"
import { ItemListRow } from "@/components/Item"
import { Heading } from "@/components/shared"
import { useStateValue } from "@/context"
import { categoriesData } from "@/utils/data"

const ContentSectionMenu = () => {
  const [{ foodItems }, dispatch] = useStateValue()
  const [categoryFilter, setCategoryFilter] = useState("chicken")

  return (
    <div className="my-3 w-full">
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title="Our Hot Dishes" className="before:left-6" />

        <div className="flex w-full items-center justify-start gap-8 overflow-x-scroll py-6 scrollbar-none lg:justify-center">
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
            items={foodItems?.filter(
              (item) => item.category === categoryFilter
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentSectionMenu
