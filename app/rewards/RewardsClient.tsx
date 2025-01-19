"use client";

export default function RewardsClient() {
  return (
    <div className="p-8 flex flex-col items-center space-y-4 overflow-x-hidden pb-24">
      <div className="py-12 relative">
        <div className="w-[800px] h-40 bg-white rotate-12 flex flex-row items-center justify-center shadow-sm">
          <div
            className="bg-[--background] w-60 h-60 shadow-lg
        rounded-full flex items-center justify-center -rotate-12
        "
          >
            <p className="text-6xl flex flex-col items-center">
              200
              <span className="text-2xl">points</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-2xl w-full">Weekly Rewards</p>
      <div className="flex flex-col space-y-4 w-full pb-8">
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read two romance books</p>
          <p className="text-xl ">+50</p>
        </div>
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read two sci-fi books</p>
          <p className="text-xl ">+50</p>
        </div>
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read four books</p>
          <p className="text-xl ">+50</p>
        </div>
      </div>
      <p className="text-2xl w-full">Monthly Rewards</p>
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read nine books</p>
          <p className="text-xl ">+150</p>
        </div>
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read five horror books</p>
          <p className="text-xl ">+150</p>
        </div>
        <div className="flex flex-row space-between items-center w-full bg-white rounded-xl py-2 px-4">
          <p className="text-xl w-full flex-1">Read three novellas</p>
          <p className="text-xl ">+100</p>
        </div>
      </div>
    </div>
  );
}
