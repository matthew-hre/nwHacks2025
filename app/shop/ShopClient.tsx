"use client";

import oak_shelf from "@/public/assets/shelves/0.png";
import birch_shelf from "@/public/assets/shelves/1.png";
import darkoak_shelf from "@/public/assets/shelves/2.png";
import fern from "@/public/assets/plants/fern.png";
import cactus from "@/public/assets/plants/cactus.png";
import lilacs from "@/public/assets/plants/lilacs.png";
import pink from "@/public/assets/plants/pink.png";
import red from "@/public/assets/plants/red.png";

import worm from "@/public/assets/pets/worm.gif";
import cat from "@/public/assets/pets/cat.gif";

export default function ShopClient() {
  return (
    <div className="p-8 flex flex-col items-center space-y-4 overflow-x-hidden pb-24">
      <p className="text-3xl w-full">Rewards: 0</p>
      <p className="text-2xl w-full">Shelves</p>
      <div className="flex flex-row space-x-4 pb-8 overflow-x-auto w-full">
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={oak_shelf.src} alt="oak shelf" className="min-w-64" />
          <p className="text-3xl absolute bottom-0 mb-10">Oak Shelf</p>
          <p className="text-xl absolute bottom-0 mb-2">300</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={birch_shelf.src} alt="oak shelf" className="min-w-64" />
          <p className="text-3xl absolute bottom-0 mb-10">Birch Shelf</p>
          <p className="text-xl absolute bottom-0 mb-2">400</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={darkoak_shelf.src} alt="oak shelf" className="min-w-64" />
          <p className="text-3xl absolute bottom-0 mb-10">Dark Oak Shelf</p>
          <p className="text-xl absolute bottom-0 mb-2">600</p>
        </div>
      </div>
      <p className="text-2xl w-full">Plants</p>
      <div className="flex flex-row space-x-4 pb-8 overflow-x-auto w-full">
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative min-h-64">
          <img src={fern.src} alt="fern" className="min-w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Fern</p>
          <p className="text-xl absolute bottom-0 mb-2">100</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={cactus.src} alt="fern" className="min-w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Cactus</p>
          <p className="text-xl absolute bottom-0 mb-2">100</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={lilacs.src} alt="fern" className="min-w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Lilac</p>
          <p className="text-xl absolute bottom-0 mb-2">150</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={pink.src} alt="fern" className="min-w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Pink(?)</p>
          <p className="text-xl absolute bottom-0 mb-2">200</p>
        </div>
        <div className="flex flex-col items-center w-full bg-white rounded-xl py-2 px-4 relative">
          <img src={red.src} alt="fern" className="min-w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Red(?)</p>
          <p className="text-xl absolute bottom-0 mb-2">200</p>
        </div>
      </div>
      <p className="text-2xl w-full">Pets</p>
      <div className="flex flex-row space-x-4 pb-8 overflow-x-auto w-full">
        <div className="flex flex-col items-center bg-white rounded-xl py-2 px-4 relative min-h-64">
          <img src={worm.src} alt="worm" className="w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Joey</p>
          <p className="text-xl absolute bottom-0 mb-2">free. take him.</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-xl py-2 px-4 relative">
          <img src={cat.src} alt="cat" className="w-40" />
          <p className="text-3xl absolute bottom-0 mb-10">Cheddar</p>
          <p className="text-xl absolute bottom-0 mb-2">you wish</p>
        </div>
      </div>
    </div>
  );
}
