import { motion } from "framer-motion"
import React, { createRef, useState } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import { ItemListRow } from "@/components/Item"
import { Heading } from "@/components/shared"
import { useStateValue } from "@/context"

const ContentSectionSlider = () => {
  const ref = createRef()

  const [{ foodItems }, dispatch] = useStateValue()
  const fruitsData = foodItems?.filter((item) => item.category === "fruits")

  const [scrollX, setScrollX] = useState(0)
  const [endScroll, setEndScroll] = useState(false)

  const handleScroll = (offset) => {
    ref.current.scrollLeft += offset
    setScrollX(scrollX + offset) // update current position X

    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setEndScroll(true)
    } else {
      setEndScroll(false)
    }
  }

  return (
    <div className="my-3 w-full">
      <div className="flex w-full items-center justify-between">
        <Heading title="Our fresh & healthy fruits" />

        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-orange-300 hover:bg-orange-500 dark:bg-orange-700 dark:hover:bg-orange-600"
            onClick={() => handleScroll(-200)}
            disabled={scrollX === 0}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.75 }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-orange-300 hover:bg-orange-500 dark:bg-orange-700 dark:hover:bg-orange-600"
            onClick={() => handleScroll(200)}
            disabled={endScroll}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.button>
        </div>
      </div>

      <ItemListRow ref={ref} scrollable={true} items={fruitsData} />
    </div>
  )
}

export default ContentSectionSlider
