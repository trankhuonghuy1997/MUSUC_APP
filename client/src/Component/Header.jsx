import React from "react";
import { Logo } from "../assets/img";
import { NavLink } from "react-router-dom";
import { isActiveStyle, isNotActiveStyle } from "../utils/style";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to="/">
        <img src={Logo} alt="logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            to="/music"
          >
            Music
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            to="/premium"
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            to="/contact-us"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center justify-center ml-auto cursor-pointer gap-2 relative">
        <img
          src={user?.user?.imageUrl}
          alt=""
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-eadingColor font-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 ">
            Premium member <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
