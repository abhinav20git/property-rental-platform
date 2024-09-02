'use client'
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import reviews from "@/api/reviews";

function ReviewSection() {
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-slate-700  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Hear our Travelers: Voices of Satisfaction</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={reviews}
                direction="left"
                speed="slow"
      />
            </div>
        </div>
    </div>
  )
}

export default ReviewSection