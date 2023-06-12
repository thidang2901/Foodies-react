import React from "react"

const FoodiesInput = ({ label, value, onChange, placeholder, required = true }) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 border-b border-gray-300 py-2">
      <p>{label}</p>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full border-none bg-transparent text-lg text-textColor outline-none placeholder:text-gray-300"
      />
    </div>
  )
}

export default FoodiesInput
