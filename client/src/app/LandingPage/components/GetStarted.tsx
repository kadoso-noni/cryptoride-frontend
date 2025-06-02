"use client";
import { UserRound } from "lucide-react";
import { Car } from "lucide-react";

export const GetStarted = () => {
  return (
    <section id="get-started"
      className="py-20 font-inter"
      style={{
        backgroundImage: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
      }}
    >
      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl md:text-6xl lg:text-[5.5rem]">
            Ready to Get Started?
          </h2>

          <p className="mt-11 max-w-4xl text-center text-lg leading-8 text-[#D1D5DB] sm:text-xl md:text-[1.375rem]">
            Join the future of decentralized transportation. Whether you need a
            ride or want to earn, CryptoRide is building the next generation of
            ride-sharing.
          </p>
          <div className="flex flex-col mt-3 items-center gap-2 sm:flex-row sm:gap-8">
            <button className="mt-8 flex cursor-pointer items-center gap-3 rounded-md bg-[#22C55E] px-6 py-3 text-base font-bold transition-colors md:mt-10 md:px-8 md:py-4">
              <UserRound  className="text-white"/>
              <span className="text-center font-medium text-white">
                Ride as Passenger
              </span>
            </button>
            <button className="mt-8 flex cursor-pointer items-center gap-3 rounded-md bg-white px-6 py-3 text-base font-bold transition-colors md:mt-10 md:px-8 md:py-4">
              <Car />
              <span className="text-center font-medium text-black">
                Drive & Earn
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
