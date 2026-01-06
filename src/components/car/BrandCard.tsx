
import type { Brand } from '@/types/brand'

interface BrandCardProps {
  brand: Brand
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        gap-2
        rounded-xl
        bg-white
        px-4 py-5
        shadow-sm
        border-white
        transition
        hover:shadow-md
        hover:-translate-y-1
        cursor-pointer
      "
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-10 w-auto object-contain"
      />

      <span className="font-medium text-sm md:text-base">
        {brand.name}
      </span>

      <p className="text-xs md:text-sm text-blue-600">
        +{brand.count}
      </p>
    </div>
  )
}

export default BrandCard