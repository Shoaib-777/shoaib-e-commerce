const LoadingComp = () => {
  const skeletons = Array(8).fill(null);
  return (
    <>
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl"
        >
          {/* Image Skeleton */}
          <div className="skeleton w-[250px] h-[250px] mx-auto rounded-md mb-3"></div>

          {/* Category + Price Row Skeleton */}
          <div className="flex justify-between items-center mb-2">
            <div className="skeleton w-16 h-5 rounded-full"></div>
            <div className="skeleton w-24 h-5 rounded-md"></div>
          </div>

          {/* Title Skeleton */}
          <div className="skeleton w-[90%] h-5 mb-2"></div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-3">
            <div className="skeleton w-full h-3"></div>
            <div className="skeleton w-[85%] h-3"></div>
            <div className="skeleton w-[60%] h-3"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex justify-between items-center">
            <div className="skeleton w-[70%] h-10 rounded-lg"></div>
            <div className="skeleton w-10 h-10 rounded-full"></div>
          </div>
        </div>
      ))
      }

    </>)
}
export default LoadingComp