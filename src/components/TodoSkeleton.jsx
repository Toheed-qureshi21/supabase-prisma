export default function TodoSkeleton() {
  return (
    <div className="w-xs sm:w-md space-y-6 ">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="relative p-5 rounded-xl shadow-md border-2 border-gray-400 bg-white animate-pulse"
        >
          {/* Status badge */}
          <div className="absolute top-2 right-2 h-5 w-20 bg-gray-200 rounded-full" />

          {/* Title */}
          <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />

          {/* Description */}
          <div className="h-4 w-full bg-gray-200 rounded mb-1" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />

          {/* Footer Row */}
          <div className="flex justify-between items-end mt-4">
            {/* Date */}
            <div className="space-y-1 text-xs">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>

            {/* Dropdown */}
            <div className="flex flex-col items-start gap-1 w-28">
              <div className="h-4 w-16 bg-gray-300 rounded-sm" />
              <div className="h-8 w-full bg-gray-200 rounded-md" />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
