import PropTypes from "prop-types"
import React from "react"
import { Controller } from "react-hook-form"

const InputField = (props) => {
  const { form, name, label, disabled, type, autoComplete, suffixIcon, onClickSuffixIcon } = props
  const {
    formState: { errors },
  } = form
  return (
    <Controller
      name={name}
      control={form.control}
      label={label}
      disabled={disabled}
      render={({ field }) => (
        <div className="flex w-300 flex-col gap-2">
          <label className="dark:text-primary">{label}</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <label className="cursor-pointer" onClick={onClickSuffixIcon}>
                {suffixIcon}
              </label>
            </div>
            <input
              className={`w-full rounded-md border-2 bg-gray-100 px-2 py-1 transition-all duration-200 ease-in-out ${
                errors[name] ? " border-red-400 outline-red-400" : "outline-gray-200"
              }`}
              {...field}
              type={type ?? "text"}
              autoComplete={autoComplete}
            />
          </div>
          {errors[name] && <p className="text-sm text-red-500">{errors[name].message}</p>}
        </div>
      )}
    />
  )
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputField
