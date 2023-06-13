import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import { MdAdd, MdHome, MdLogin, MdLogout, MdShoppingBasket } from "react-icons/md"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

import { LoginModal } from "@/components/Modal"
import { ThemeSwitcher } from "@/components/shared"
import { actionType, useStateValue } from "@/context"

import Avatar from "@/assets/images/avatar.png"
import UserAvatar from "@/assets/images/user.png"
import Logo from "@/assets/logo/logo-no-background.svg"

import "./styles.css"

const Header = () => {
  const [{ user, cartShow, cartItems, activeScreen }, dispatch] = useStateValue()
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [modalShown, toggleModal] = useState(false)

  // TODO: add admin privilege feature
  const isAdmin = user && user.email === import.meta.env.VITE_ADMIN_EMAIL
  const avatarImg = useMemo(() => {
    if (!user) return UserAvatar
    if (user?.photoURL) return user.photoURL
    return Avatar
  }, [user])

  const numCartItems = Object.keys(cartItems).reduce((prevNum, currentId) => {
    if (cartItems[currentId]?.cartQty) {
      return prevNum + cartItems[currentId].cartQty
    }
    return prevNum
  }, 0)

  const signOut = () => {
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
    <header className="header">
      {/* desktop & tablet */}
      <div className="header__desktop">
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
            <li onClick={closeSubMenu}>
              <HashLink smooth to="/#home">
                Home
              </HashLink>
            </li>
            <li onClick={closeSubMenu}>
              <HashLink smooth to="/#menu">
                Menu
              </HashLink>
            </li>
            <li onClick={closeSubMenu}>
              <HashLink smooth to="/#about">
                About Us
              </HashLink>
            </li>
            <li onClick={closeSubMenu}>
              <HashLink smooth to="/#contact">
                Contact Us
              </HashLink>
            </li>
          </motion.ul>

          {activeScreen === "home" && (
            <div className="relative flex items-center justify-center" onClick={showCart}>
              <MdShoppingBasket className="header__cart" />
              {numCartItems > 0 && (
                <div className=" absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cartNumBg">
                  <p className="text-xs font-semibold text-white">{numCartItems}</p>
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={avatarImg}
              className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
              alt="user-profile"
              onClick={toggleSubMenu}
            />
            {openSubMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-12 right-0 flex w-40 flex-col rounded-lg bg-gray-50 shadow-xl dark:bg-neutral-800"
                onClick={closeSubMenu}
              >
                <p className="header__submenu">
                  <ThemeSwitcher label={"Theme"} />
                </p>

                {isAdmin && (
                  <Link to={"/admin/create-item"}>
                    <p className="header__submenu">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                {user ? (
                  <p className="header__submenu-loginBtn" onClick={signOut}>
                    Sign out <MdLogout />
                  </p>
                ) : (
                  <p className="header__submenu-loginBtn" onClick={toggleLoginModal}>
                    Sign in <MdLogin />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="header__mobile">
        {activeScreen === "home" ? (
          <div className="relative flex items-center justify-center" onClick={showCart}>
            <MdShoppingBasket className="header__cart" />
            {numCartItems > 0 && (
              <div className=" absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cartNumBg">
                <p className="text-xs font-semibold text-white">{numCartItems}</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/">
            <MdHome className="header__cart" />
          </Link>
        )}

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="h-8 object-cover" alt="logo" />
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={avatarImg}
            className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
            alt="user-profile"
            onClick={toggleSubMenu}
          />
          {openSubMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute top-12 right-0 flex w-44 flex-col rounded-lg bg-gray-50 shadow-xl dark:bg-neutral-800"
              onClick={closeSubMenu}
            >
              <ul className="flex flex-col">
                <li onClick={closeSubMenu}>
                  <HashLink smooth to="/#home">
                    Home
                  </HashLink>
                </li>
                <li onClick={closeSubMenu}>
                  <HashLink smooth to="/#menu">
                    Menu
                  </HashLink>
                </li>
                <li onClick={closeSubMenu}>
                  <HashLink smooth to="/#about">
                    About Us
                  </HashLink>
                </li>
                <li onClick={closeSubMenu}>
                  <HashLink smooth to="/#contact">
                    Contact Us
                  </HashLink>
                </li>

                <p className="header__submenu">
                  <ThemeSwitcher label={"Theme"} />
                </p>

                {isAdmin && (
                  <p className="header__submenu">
                    <Link to={"/admin/create-item"}>
                      <span className="flex items-center ">
                        New Item <MdAdd />
                      </span>
                    </Link>
                  </p>
                )}
              </ul>

              {user ? (
                <p className="header__submenu-loginBtn" onClick={signOut}>
                  Sign out <MdLogout />
                </p>
              ) : (
                <p className="header__submenu-loginBtn" onClick={toggleLoginModal}>
                  Sign in <MdLogin />
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {modalShown && (
        <LoginModal
          onClose={() => {
            closeLoginModal()
            closeSubMenu()
          }}
        />
      )}
    </header>
  )
}

export default Header
