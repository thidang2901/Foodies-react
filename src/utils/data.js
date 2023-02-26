import C3 from "@assets/images/c3.png"
import F1 from "@assets/images/f1.png"
import FI1 from "@assets/images/fi1.png"
import I1 from "@assets/images/i1.png"

const heroData = [
  {
    id: 1,
    name: "Ice-cream",
    description: "Chocolate & Vanilla",
    price: "5.25",
    imgSrc: I1,
  },
  {
    id: 2,
    name: "Strawberries",
    description: "Fresh Strawberries",
    price: "10.25",
    imgSrc: F1,
  },
  {
    id: 3,
    name: "Chicken Kebab",
    description: "Mixed Kebab Plate",
    price: "8.25",
    imgSrc: C3,
  },
  {
    id: 4,
    name: "Fish Kebab",
    description: "Mixed Fish Plate",
    price: "5.25",
    imgSrc: FI1,
  },
]

const categoriesData = [
  {
    id: 1,
    name: "Chicken",
    urlParamName: "chicken",
  },
  {
    id: 2,
    name: "Curry",
    urlParamName: "curry",
  },
  {
    id: 3,
    name: "Rice",
    urlParamName: "rice",
  },
  {
    id: 4,
    name: "Fish",
    urlParamName: "fish",
  },
  {
    id: 5,
    name: "Fruits",
    urlParamName: "fruits",
  },
  {
    id: 6,
    name: "Ice-creams",
    urlParamName: "icecreams",
  },
  {
    id: 7,
    name: "Soft Drinks",
    urlParamName: "drinks",
  },
]

export { heroData, categoriesData }
