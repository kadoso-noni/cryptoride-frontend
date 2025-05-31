'use client'
import { NavBar } from "./Navbar";
import Image from "next/image";
import { CarTaxiFront } from "lucide-react";
import { RaiseHand } from "./SVG/svg";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-auto min-h-screen w-full bg-[url('/bg-hero.png')] bg-cover bg-center bg-no-repeat">
      <NavBar />
      <div className="container mx-auto mt-20 flex flex-col items-center gap-6 px-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-white font-manrope text-3xl font-extrabold sm:text-4xl md:text-6xl lg:text-[5.5rem]">
            Ride-Sharing on
          </p>
          <p className="mt-5 font-manrope text-3xl font-extrabold text-[#D7C5FF] sm:text-4xl md:text-6xl lg:text-[5.5rem]">
            Starknet
          </p>

          <p className="mt-4 max-w-xl text-center font-manrope text-lg font-medium text-ash sm:text-xl md:text-[1.375rem]">
            CryptoRide revolutionizes ride-sharing with blockchain technology,
            creating a secure, transparent, and efficient transportation
            platform.
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
            <button className="hover:bg-black bg-white mt-8 flex cursor-pointer items-center gap-3 rounded-[624.9375rem]  px-6 py-3 text-base font-bold transition-colors md:mt-10 md:px-8 md:py-4">
              <CarTaxiFront />
              <span className="text-center font-medium text-[#06050A]">
                Become a driver
              </span>
            </button>
            <button className="hover:bg-black mt-8 flex cursor-pointer items-center gap-3 rounded-[624.9375rem]  bg-[#0A0813] px-6 py-3 text-base font-bold transition-colors md:mt-10 md:px-8 md:py-4">
              <RaiseHand />
              <span className="text-white text-center font-medium">
                Book a ride
              </span>
            </button>
          </div>
        </div>
        <div className="relative mx-auto mt-6">
          <Image
            src="/order.png"
            alt="order mockup"
            width={700}
            height={1000}
            className="h-auto w-full"
            priority
          />
        </div>
        <h2 className="text-white text-center font-manrope text-3xl font-bold sm:text-4xl md:text-6xl">
          Pay for your ride in over 20+ cryptocurrency
        </h2>

        <p className="text-white text-center font-manrope text-lg sm:text-xl md:text-[1.375rem]">
          Stark, Bitcoin, Ethereum, USDT, Solana and more…
        </p>
        <button className="text-white mt-6 rounded-[624.9375rem] bg-purpleLight px-[3.8125rem] py-[0.875rem] text-center font-medium">
          Get Started
        </button>
        <div className="relative w-full overflow-hidden mb-10">
          <div className="to-transparent pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#06050A]" />
          <div className="to-transparent pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#06050A]" />

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex w-max"
          >
            <Image
              src="/infinityscrolicons.png"
              alt="crypto icons"
              width={1700}
              height={200}
              className="h-auto w-[1700px]"
              priority
            />
            <Image
              src="/infinityscrolicons.png"
              alt="crypto icons"
              width={1700}
              height={200}
              className="h-auto w-[1700px]"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
