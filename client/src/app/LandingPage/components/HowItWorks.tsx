"use client";
import { useState } from "react";

const steps = {
  passenger: [
    {
      title: "Connect Your Wallet",
      desc: "Link your Argent X or Braavos wallet to get started.",
    },
    {
      title: "Set Pickup & Destination",
      desc: "Choose your pickup location and where you want to go.",
    },
    {
      title: "Confirm & Pay",
      desc: "Approve the smart contract to lock your payment in escrow until the ride is complete.",
    },
    {
      title: "Enjoy Your Ride",
      desc: "Once the ride is complete, payment is automatically released to the driver.",
    },
  ],
  driver: [
    {
      title: "Create Your Profile",
      desc: "Register your driver account and link your wallet.",
    },
    {
      title: "Accept Ride Requests",
      desc: "Get notified and accept rides near you.",
    },
    {
      title: "Complete the Ride",
      desc: "Navigate to the destination and complete the ride safely.",
    },
    {
      title: "Receive Payment",
      desc: "Payment is released to your wallet after the ride ends.",
    },
  ],
};

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("passenger");

  return (
    <section className="w-full bg-white px-4 py-20 font-manrope">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-extrabold leading-tight text-[#291769] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
          How It Works
        </h2>

        {/* Tabs */}
        <div className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 rounded-full bg-[#1A1A1A] p-4 sm:flex-row sm:justify-center sm:gap-4">
          <button
            onClick={() => setActiveTab("passenger")}
            className={`mx-auto w-fit rounded-full px-6 py-3 text-sm sm:text-2xl font-medium transition-all sm:w-full sm:py-6 ${
              activeTab === "passenger"
                ? "bg-[#A371F4] text-white"
                : "text-white hover:bg-[#333]"
            } w-full sm:w-auto`}
          >
            For passengers
          </button>
          <button
            onClick={() => setActiveTab("driver")}
            className={`mx-auto w-fit rounded-full px-6 py-3 text-sm sm:text-2xl font-medium transition-all sm:w-full sm:py-6 ${
              activeTab === "driver"
                ? "bg-purpleLight text-white"
                : "text-white hover:bg-[#333]"
            } w-full sm:w-auto`}
          >
            For drivers
          </button>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-12 font-inter flex flex-col gap-6 px-4 text-left sm:px-0 md:max-w-2xl lg:max-w-3xl">
          {steps[activeTab].map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <p className="text-base font-semibold text-[#0A0A0A] sm:text-lg">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-[#4B5563] sm:text-base">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
