export default function TodoSkeleton() {
  return (
    <>
      <div className="animate-pulse w-[23rem] rounded-xl p-4 shadow-lg border border-indigo-200 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-300 rounded-sm"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
}
