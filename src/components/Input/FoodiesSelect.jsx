import React from "react"

const FoodiesSelect = ({
  label,
  prefixKey,
  defaultValue,
  value,
  onChange,
  placeholder,
  optionKey = "id",
  optionValue = "value",
  optionLabel = "value",
  options = [],
  required = true,
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 border-gray-300 py-2">
      <p>{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base outline-none"
      >
        {defaultValue && (
          <option value="" disabled>
            {defaultValue}
          </option>
        )}
        {options &&
          options.map((item) => (
            <option
              key={`${prefixKey} ${item[optionKey]}`}
              value={item[optionValue]}
              className="border-0 bg-white text-base text-headingColor outline-none"
            >
              {item[optionLabel]}
            </option>
          ))}
      </select>
    </div>
  )
}

export default FoodiesSelect
