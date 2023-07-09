import React from "react";
import { FcMusic } from "react-icons/fc";
import { GiMusicalNotes } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <>
      <header className="p-3 flex justify-center items-center mt-10 mb-20">
        <nav
          className="
          flex flex-wrap
          items-center
          justify-between
          py-4
          w-[50%]
          md:py-4
          px-4
          text-lg text-gray-700
          backdrop-blur-sm
          shadow-lg
          fixed
        
        "
        >
          <div>
            <a href="/" className="flex">
              <FcMusic size={30} className="mx-1" />
              <b>MUSIC</b>
              <GiMusicalNotes size={30} className="mx-1" />
            </a>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div
            className="hidden w-full md:flex md:items-center md:w-auto"
            id="menu"
          >
            <ul
              className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
            >
              <li>
                <ConnectButton/>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
