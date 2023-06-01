import axios from "axios"
import React, { useEffect, useState } from "react"

import { FoodiesInput, FoodiesSelect } from "@/components/Input"

const AddressForm = ({ onSubmit }) => {
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [locationData, setLocationData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [wardData, setWardData] = useState([])

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [ward, setWard] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    getLocationData()
    getProvinceData()
  }, [])

  useEffect(() => {
    getDistrictData()
  }, [province])

  useEffect(() => {
    getWardData()
  }, [district])

  const getLocationData = async () => {
    const data = await axios
      .get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then((resp) => resp.data)
      .catch((err) => console.error(err))

    setLocationData(data ?? [])
  }

  const getProvinceData = () => {
    let provinces = []
    if (locationData.length > 0) {
      provinces = locationData.map((item) => item.Name)
    }
    setProvinceData(provinces)
  }

  const getDistrictData = () => {
    const item = provinceData.find((e) => e.Id === province)
    setDistrictData(item ? item.Districts : [])
  }

  const getWardData = () => {
    const item = districtData.find((e) => e.Id === district)
    setWardData(item ? item.Wards : [])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    onSubmit(e)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <FoodiesInput label="Your name" placeholder="Thi Dang" onChange={(e) => setName(e)} />
      <FoodiesInput label="Phone" placeholder="0123456789" onChange={(e) => setPhone(e)} />
      <FoodiesInput label="Email" placeholder="admin@foodies.com" onChange={(e) => setEmail(e)} />

      <FoodiesSelect
        label="Province / City"
        prefixKey="province"
        defaultValue="Choose a province/city"
        value={province}
        options={provinceData}
        optionKey="Id"
        optionValue="Id"
        optionLabel="Name"
        onChange={(e) => setProvince(e)}
      />
      {province && (
        <FoodiesSelect
          label="District"
          prefixKey="district"
          defaultValue="Choose a district"
          value={district}
          options={districtData}
          optionKey="Id"
          optionValue="Id"
          optionLabel="Name"
          onChange={(e) => setDistrict(e)}
        />
      )}
      {district && (
        <FoodiesSelect
          label="Ward"
          prefixKey="ward"
          defaultValue="Choose a ward"
          value={ward}
          options={wardData}
          optionKey="Id"
          optionValue="Id"
          optionLabel="Name"
          onChange={(e) => setWard(e)}
        />
      )}

      <FoodiesInput
        label="Address"
        placeholder="135 Nguyễn Cư Trinh"
        onChange={(e) => setAddress(e)}
      />

      <div className="mt-6">
        <button
          className="rounded-lg bg-orange-600 px-4 py-2 text-primary"
          disabled={isLoading}
          id="submit"
        >
          <span>{isLoading ? <div className="spinner" id="spinner"></div> : "Save"}</span>
        </button>
      </div>

      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

export default AddressForm
