import { CLOSE_TIME, OPEN_TIME } from "@/utils/constants"
import React from "react"

const HourPicker = ({ onChange, from, to }) => {
  const fromHour = parseInt(from || OPEN_TIME)
  const toHour = parseInt(to || CLOSE_TIME)

  const hours = []
  for (let i = fromHour; i <= toHour; i++) {
    hours.push(i)
  }

  return (
    <div>
      <div className="flex rounded-md border bg-white p-2 text-lg shadow-lg">
        <select
          onChange={(e) => onChange(e.target.value)}
          className="cursor-pointer rounded-md border-gray-200 p-2 text-base outline-none"
        >
          {hours.map((h) => (
            <option
              key={h}
              value={h}
              className="border-0 bg-white text-center text-base text-headingColor outline-none"
            >
              {h}
            </option>
          ))}
        </select>
        <span className="px-2">:</span>
        <span className="rounded-md border-gray-200 p-2 text-center text-base outline-none">
          00
        </span>
      </div>
    </div>
  )
}

export default HourPicker
