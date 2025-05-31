"use client";
import React from "react";
import { useState } from "react";
import { Menu, X, Car, ChevronDown, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purpleLight p-3">
            <Car className="text-white" />
          </div>
          <p className="font-no-ligatures font-archive text-2xl">CryptoRide</p>
        </div>
        <button
          className="cursor-pointer rounded-lg border border-purpleDark p-1 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? <Menu /> : <X />}
        </button>

        {/* Desktop Link */}
        <ul className="text-black hidden items-center gap-8 text-base lg:flex">
          <Link href="#">About</Link>
          <Link href="#" className="flex items-center gap-1">
            <span>Services</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
          <Link href="#" className="flex items-center gap-1">
            <span>About</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
          <Link href="#" className="flex items-center gap-1">
            <span>About</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
        </ul>

        {/* button */}
        <button className="cursor bg-white text-black hover:text-white flex hidden items-center gap-1 rounded-[1.25rem] px-8 py-4 text-center text-base font-semibold hover:bg-purpleDark lg:flex">
          <Wallet />
          <span>Connect Wallet</span>
        </button>
      </nav>
      {/* Mobile Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col items-center gap-4 border p-4 pb-4">
          <Link href="#">About</Link>
          <Link href="#" className="flex items-center gap-1">
            <span>Services</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
          <Link href="#" className="flex items-center gap-1">
            <span>About</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
          <Link href="#" className="flex items-center gap-1">
            <span>About</span>
            <button>
              <ChevronDown />
            </button>
          </Link>
          <button className=" flex items-center gap-1 text-white hover:bg-black hover:text-white cursor-pointer rounded-[1.25rem] bg-purpleDark px-8 py-4 text-center text-base font-semibold lg:flex">
             <Wallet />
          <span>Connect Wallet</span>
          </button>
        </ul>
      </div>
    </header>
  );
};
