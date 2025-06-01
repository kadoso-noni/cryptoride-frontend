"use client";
import React from "react";
import { useState } from "react";
import { Menu, X, Car, ChevronDown, Wallet } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="pt-4 sm:pt-6">
      <nav className="container mx-auto flex items-center justify-between rounded-[624.9375rem] bg-[rgba(6,5,10,0.32)] px-10 py-2 shadow-[inset_8px_8px_12px_rgba(32,26,55,0.12)] backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purpleLight p-3">
            <Car className="text-white" />
          </div>
          <p className="text-white font-archive text-2xl">CryptoRide</p>
        </div>
        <button
          className="cursor-pointer rounded-lg border border-white p-1 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? <Menu className="text-white" /> : <X className="text-white" />}
        </button>

        {/* Desktop Link */}
        <ul className="text-white font-inter hidden items-center gap-8 text-base lg:flex">
          <Link href="#why-choose-us">About</Link>
          <Link href="#how-it-works" className="flex items-center gap-1">
            <span>Services</span>
          </Link>
          <Link href="#get-started" className="flex items-center gap-1">
            <span>Get Started</span>
          </Link>
          <Link href="#contact" className="flex items-center gap-1">
            <span>Contact</span>
          </Link>
        </ul>

        {/* button */}
        <button className="cursor bg-white text-black hover:text-white flex hidden items-center gap-1 rounded-[624.9375rem] px-3 py-2.5 text-center text-base font-semibold hover:bg-purpleLight lg:flex">
          <Wallet />
          <span>Connect Wallet</span>
        </button>
      </nav>
      {/* Mobile Dropdown */}
      <div
        className={`transition-all font-inter mt-3 duration-300 ease-in-out lg:hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col text-white items-center  gap-4 border border-black p-4 pb-4">
          <Link href="#why-choose-us">About</Link>
          <Link href="#how-it-works" className="flex items-center gap-1">
            <span>Services</span>
          </Link>
          <Link href="#get-started" className="flex items-center gap-1">
            <span>Get Started</span>
          </Link>
          <Link href="#contact" className="flex items-center gap-1">
            <span>Contact</span>
          </Link>
          <button className="text-white hover:bg-black hover:text-white flex cursor-pointer items-center gap-1 rounded-[1.25rem] bg-purpleDark px-8 py-4 text-center text-base font-semibold lg:flex">
            <Wallet />
            <span>Connect Wallet</span>
          </button>
        </ul>
      </div>
    </header>
  );
};
