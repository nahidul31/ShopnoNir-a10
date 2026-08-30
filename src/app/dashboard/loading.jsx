import { Icon } from "@iconify/react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Pulsing rings behind the logo */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute w-24 h-24 rounded-full bg-[#A61C3C]/10 animate-ping" />
        <span
          className="absolute w-32 h-32 rounded-full bg-[#A61C3C]/5 animate-ping"
          style={{ animationDelay: "0.4s" }}
        />

        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] flex items-center justify-center shadow-lg shadow-[#7A1F2B]/30">
          <Icon
            icon="solar:home-2-bold"
            className="text-3xl text-white animate-pulse"
          />
        </div>
      </div>

      <p className="text-default-700 font-semibold">Loading</p>

      <p className="text-default-400 text-sm mt-1">
        Getting things ready for you
      </p>

      {/* Sliding progress bar */}
      <div className="w-52 h-1 bg-default-100 rounded-full overflow-hidden mt-6">
        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] animate-[slide_1.4s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  );
}
