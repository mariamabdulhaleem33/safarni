import GalleryImages from "./GalleryImages"

export default function Gallery() {
  return (
    <div>
      <div className="flex">
        <h3 className="font-poppins font-medium text-[25px] mb-2">Gallery</h3>
        <span className="font-medium font-poppins text-[22px] text-[#1E429F]">
          (200)
        </span>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <GalleryImages />
      </div>
    </div>
  )
}
