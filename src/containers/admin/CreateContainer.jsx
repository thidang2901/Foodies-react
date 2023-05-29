import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from "react-icons/md"

import { Loader } from "@/components/shared"
import { storage } from "@/configs/firebase.config"
import { actionType, useStateValue } from "@/context"
import { categoriesData } from "@/utils/data"
import { getAllFoodItems, saveItem } from "@/utils/firebaseFunctions"

const CreateContainer = () => {
  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageAsset, setImageAsset] = useState(null)

  const [fields, setFields] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alertStatus, setAlertStatus] = useState("danger")
  const [msg, setMsg] = useState(null)

  const [{ _ }, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "admin_create",
    })
  }, [])

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  const uploadImage = (e) => {
    setIsLoading(true)

    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        handleError({ msg: "Error while uploading, try again ☹️", error })
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset()
          handleSuccess({
            imageURL: downloadURL,
            msg: "Image uploaded successfully 👌",
          })
        })
      }
    )
  }

  const deleteImage = () => {
    setIsLoading(false)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      handleSuccess({ msg: "Image deleted successfully 🗑️" })
    })
  }

  const saveDetails = () => {
    setIsLoading(true)
    try {
      if (!title || !category || !calories || !imageAsset || !price) {
        handleError({ msg: "Required fields cannot be empty!" })
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          category,
          calories,
          quantity: 1,
          price,
        }
        saveItem(data)
        handleSuccess({ msg: "Item saved successfully 🎉" })
        clearData()
      }
    } catch (error) {
      handleError({ msg: "Error while saving item, try again ☹️", error })
    }

    fetchData()
  }

  const handleSuccess = ({ imageURL = null, msg = null }) => {
    setImageAsset(imageURL)
    setIsLoading(false)
    if (msg) {
      setFields(true)
      setMsg(msg)
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 4000)
    }
  }

  const handleError = ({ msg = null, error = null }) => {
    if (error) console.error(error)

    setIsLoading(false)
    setFields(true)
    setMsg(msg)
    setAlertStatus("danger")
    setTimeout(() => {
      setFields(false)
    }, 4000)
  }

  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setCalories("")
    setPrice("")
    setCategory("")
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-4 md:w-[75%]">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full rounded-lg p-2 text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="flex w-full items-center gap-2 border-b border-gray-300 py-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="h-full w-full border-none bg-transparent text-lg text-textColor outline-none placeholder:text-gray-300"
          />
        </div>

        <div className="w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base outline-none"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="border-0 bg-white text-base capitalize text-headingColor outline-none"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex h-225 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-300 md:h-420">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-3xl text-gray-500 hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="h-0 w-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded-img"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
          <div className="flex w-full items-center gap-2 border-b border-gray-300 py-2">
            <MdFoodBank className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="h-full w-full border-none bg-transparent text-lg text-textColor outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex w-full items-center gap-2 border-b border-gray-300 py-2">
            <MdAttachMoney className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="h-full w-full border-none bg-transparent text-lg text-textColor outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex w-full items-center">
          <button
            type="button"
            className="ml-0 w-full rounded-lg border-none bg-emerald-500 px-12 py-2 text-lg font-semibold text-white outline-none md:ml-auto md:w-auto"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer
