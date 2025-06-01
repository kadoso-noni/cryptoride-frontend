import { PaymentIcon, WebIcon } from "./SVG/svg";
import { Shield } from "lucide-react";

export const WhyChooseUs = () => {
  const cards = [
    {
      icon: PaymentIcon,
      title: "Crypto Payments",
      text: "Pay for rides with STARK tokens. Drivers can choose to receive crypto or fiat currency.",
      bgColor: "bg-[#DCFCE7]",
    },
    {
      icon: Shield,
      title: "Secure Escrow",
      text: "Smart contracts lock payment until the ride is completed, ensuring security for both parties.",
      bgColor: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
    },
    {
      icon: WebIcon,
      title: "Decentralized",
      text: "No central authority. Lower fees, transparent operations, and community governance.",
      bgColor: "bg-[#F3E8FF]",
    },
  ];

  return (
    <section className="h-auto min-h-screen w-full bg-black bg-[url('/moon-bg.png')] bg-cover bg-center bg-no-repeat font-manrope">
      <div className="container mx-auto flex flex-col gap-6 px-6 py-20">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-[5.5rem]">
          Why Choose Us?
        </h2>
        <p className="mx-auto max-w-4xl text-center text-lg font-medium text-[rgba(255,255,255,0.64)] sm:text-xl md:text-2xl lg:text-3xl">
          At CryptoRider, we provide a seamless way to pay for your rides with
          crypto currency
        </p>
        <div className="mt-5 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {cards.map(
            ({ icon: Icon, title, text, bgColor, iconColor }, index) => (
              <div
                key={index}
                className="rounded-[0.97831rem] bg-[#121319] p-6 shadow-md"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}
                >
                  <Icon size={24} className={`${iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-darkAsh">{text}</p>
              </div>
            ),
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <button className="w-full max-w-lg rounded-[624.9375rem] bg-purpleLight px-[3.8125rem] py-[0.875rem] text-center font-medium text-white">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};
