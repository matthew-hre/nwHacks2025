"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import shelf_logo from "@/public/assets/icons/shelf-logo.png";
import shop from "@/public/assets/icons/shop-logo.png";
import add from "@/public/assets/icons/add2-logo.png";
import profile from "@/public/assets/icons/profile-logo.png";
import rewards from "@/public/assets/icons/rewards-logo.png";

interface NavLinkProps {
  href: string;
  src: string;
  alt: string;
  label: string;
}

function NavLink({ href, src, alt, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center text-brand-brown font-sans w-full flex-1 py-2 transition-all ${
        isActive ? "bg-gray-200 rounded-xl" : ""
      }`}
    >
      <img src={src} alt={alt} className="h-12 w-12" />
      {label}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bottom-0 fixed w-full bg-white shadow-lg z-10">
      <div className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <NavLink href="/" src={shelf_logo.src} alt="shelf" label="Shelf" />
          <NavLink
            href="/rewards"
            src={rewards.src}
            alt="rewards"
            label="Rewards"
          />
          <NavLink href="/addbook" src={add.src} alt="add" label="Add" />
          <NavLink href="/shop" src={shop.src} alt="shop" label="Shop" />
          <NavLink
            href="/profile"
            src={profile.src}
            alt="profile"
            label="Profile"
          />
        </div>
      </div>
    </nav>
  );
}
