import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bottom-0 fixed w-full bg-gray-500 shadow-lg z-10">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white">
            Shelf
          </Link>
          <Link href="/rewards" className="text-white">
            Rewards
          </Link>
          <Link href="/addbook" className="text-white">
            Add
          </Link>
          <Link href="/shop" className="text-white">
            Shop
          </Link>
          <Link href="/profile" className="text-white">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
