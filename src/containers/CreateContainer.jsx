import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md"

import { categoriesData } from "../utils/data"
import { Loader } from "../components"
import { storage } from "../configs/firebase.config"
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/reducer"

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

  const [{ foodItems }, dispatch] = useStateValue()

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
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
    <div className="w-full h-auto min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-300 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full h-225 md:h-420 group flex flex-col justify-center items-center border-2 border-dotted border-gray-300 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded-img"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
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

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
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
