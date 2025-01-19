"use client";

import logo from "@/public/assets/icons/logo.png";

export default function Logo() {
  return (
    <div className="w-full flex justify-center items-center">
      <img src={logo.src} alt="Logo" className="w-1/4 py-4" />
    </div>
  );
}
