import { motion } from "framer-motion"
import React, { useState } from "react"
import { MdAdd, MdLogin, MdLogout, MdShoppingBasket } from "react-icons/md"
import { Link } from "react-router-dom"

import { LoginModal } from "@/components/Modal"
import { ThemeSwitcher } from "@/components/shared"
import { actionType, useStateValue } from "@/context"

import Avatar from "@/assets/images/avatar.png"
import Logo from "@/assets/logo/logo-no-background.svg"

const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [modalShown, toggleModal] = useState(false)

  // TODO: add admin privilege feature
  const isAdmin = user && user.email === "dkthi2901@gmail.com"

  const numCartItems = Object.keys(cartItems).reduce((prevNum, currentId) => {
    if (cartItems[currentId]?.cartQty) {
      return prevNum + cartItems[currentId].cartQty
    }
    return prevNum
  }, 0)

  const logout = () => {
    closeSubMenu()
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }

  const showCart = () => {
    setOpenSubMenu(false)

    dispatch({
      type: actionType.SET_SHOW_CART,
      cartShow: !cartShow,
    })
  }

  const toggleSubMenu = () => {
    setOpenSubMenu((prevState) => !prevState)
  }

  const closeSubMenu = () => {
    setOpenSubMenu(false)
  }

  const toggleLoginModal = () => {
    toggleModal((prevState) => !prevState)
  }
  const closeLoginModal = () => {
    toggleModal(false)
  }

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary dark:bg-neutral-900 select-none">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2" onClick={closeSubMenu}>
          <img src={Logo} className="w-40 object-cover" alt="logo" />
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={closeSubMenu}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={closeSubMenu}
            >
              <Link to="/menu">Menu</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={closeSubMenu}
            >
              <Link to="/about-us">About Us</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={closeSubMenu}
            >
              <Link to="/service">Service</Link>
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center" onClick={showCart}>
            <MdShoppingBasket className="text-textColor hover:text-headingColor dark:text-primary hover:dark:text-gray-300 text-2xl cursor-pointer" />
            {numCartItems > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{numCartItems}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="user-profile"
              onClick={toggleSubMenu}
            />
            {openSubMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:rounded-lg hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Theme <ThemeSwitcher />
                </p>

                {isAdmin && (
                  <Link to={"/admin/create-item"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:rounded-lg hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={closeSubMenu}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                {user ? (
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:rounded-lg hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Logout <MdLogout />
                  </p>
                ) : (
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:rounded-lg hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={toggleLoginModal}
                  >
                    Login <MdLogin />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center" onClick={showCart}>
          <MdShoppingBasket className="text-textColor hover:text-headingColor dark:text-primary hover:dark:text-gray-300 text-2xl cursor-pointer" />
          {numCartItems > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">{numCartItems}</p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="h-8 object-cover" alt="logo" />
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="user-profile"
            onClick={toggleSubMenu}
          />
          {openSubMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 dark:bg-neutral-800 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Service
                </li>
              </ul>

              <p className="px-4 py-2 flex items-center gap-3 text-textColor text-base dark:text-primary hover:dark:text-headingColor hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer">
                Theme <ThemeSwitcher />
              </p>

              {isAdmin && (
                <Link to={"/admin/create-item"}>
                  <p className="px-4 py-2 flex items-center gap-3 text-textColor text-base dark:text-primary hover:dark:text-headingColor hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              {user ? (
                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              ) : (
                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={toggleLoginModal}
                >
                  Login <MdLogin />
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {modalShown && <LoginModal trigger={closeSubMenu} close={closeLoginModal} />}
    </header>
  )
}

export default Header
