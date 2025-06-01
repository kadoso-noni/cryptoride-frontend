"use client";

import { FaXTwitter, FaTelegram, FaGithub } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer
      className="mt-15 w-full bg-[#06050A] px-10 py-12 md:px-16"
      id="contact"
    >
      <div className="container mx-auto flex flex-col items-start justify-between gap-10 md:flex-row">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            CryptoRide
          </h1>
          <p className="mt-1 text-sm leading-6 text-[#E8F1F2]">
            The first decentralized ride-sharing platform built on Starknet with
            crypto payments.
          </p>

          <div className="mt-4 flex gap-8">
            <a
              href="#"
              aria-label="X (Twitter)"
              className="hover:text-purpleDeep"
            >
              <FaXTwitter className="text-2xl text-[#8A8F98]" />
            </a>

            <a href="#" aria-label="Telegram" className="hover:text-green-500">
              <FaTelegram className="text-2xl text-[#8A8F98]" />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-green-500">
              <FaGithub className="text-2xl text-[#8A8F98]" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-base text-white">
          <h2 className="mb-2 text-xl font-bold">Site Map</h2>
          <a href="#home">Home</a>
          <a href="#why-choose-us">About</a>
        </div>

        <div className="flex flex-col gap-2 text-base text-white">
          <h2 className="mb-2 text-xl font-bold">Company</h2>
          <a href="#">Help & Support</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="flex flex-col gap-2 text-base text-white">
          <h2 className="mb-2 text-xl font-bold">Resource</h2>
          <a href="#">Partner</a>
          <a href="#">Blog</a>
          <a href="#">Newsletter</a>
        </div>
      </div>

      <div className="border-green-200 my-10 border-t"></div>

      <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
        <p>© 2025 CryptoRide. All rights reserved.</p>
        <p className="inline-flex items-center gap-2">
          <span>Developed By</span>
          <a
            href="https://github.com/Ibrahimyusufdev"
            target="_blank"
            className="hover:text-green-500"
          >
            <FaGithub className="text-sm text-[#8A8F98]" />
          </a>
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-purpleLight">
            Trademark Policy
          </a>
          <a href="#" className="hover:text-purpleLight">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
