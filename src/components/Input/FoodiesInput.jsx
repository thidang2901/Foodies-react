import React from "react"

const FoodiesInput = ({ label, value, onChange }) => {
  return (
    <div className="w-full">
      <p>{label}</p>
      <div className="flex w-full items-center gap-2 border-b border-gray-300 py-2">
        <input
          type="text"
          required
          value={value}
          onChange={onChange}
          placeholder=""
          className="h-full w-full border-none bg-transparent text-lg text-textColor outline-none placeholder:text-gray-300"
        />
      </div>
    </div>
  )
}

export default FoodiesInput
