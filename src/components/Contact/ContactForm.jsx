import { motion } from "framer-motion"
import React from "react"
import { useForm } from "react-hook-form"

const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end gap-4 w-2/3">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="flex w-3/5 flex-col gap-2 border-b border-gray-300 py-2">
            <input
              className="h-full w-full border-none bg-transparent text-textColor outline-none placeholder:text-gray-400"
              type="text"
              placeholder="Your name"
              {...register("name", { required: false })}
            />
          </div>
          <div className="flex w-full flex-col gap-2 border-b border-gray-300 py-2">
            <input
              className="h-full w-full border-none bg-transparent text-textColor outline-none placeholder:text-gray-400"
              type="email"
              placeholder="Your email"
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div
          className={`flex w-auto flex-col gap-2 border-b border-gray-300 py-2 ${
            errors.message?.type === "required" ? "border-b-2 border-red-300" : "border-gray-300"
          }`}
        >
          <input
            className="h-full w-full border-none bg-transparent text-textColor outline-none placeholder:text-gray-400"
            type="text"
            cols="40"
            rows="3"
            placeholder="Share your thoughts with us!"
            {...register("message", { required: true })}
            aria-invalid={errors.message ? "true" : "false"}
          />
        </div>
      </div>

      <div className="flex w-40 items-center justify-between md:flex-col-reverse md:gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-150 rounded-lg bg-orange-500 py-2 hover:shadow-md"
        >
          <span className="text-base text-white">Send</span>
        </motion.button>
      </div>
    </form>
  )
}

export default ContactForm
