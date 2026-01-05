export default function Separator() {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#373737] "></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-[#373737]">or</span>
      </div>
    </div>
  )
}
