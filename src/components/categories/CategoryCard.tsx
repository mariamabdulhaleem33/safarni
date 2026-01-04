interface CategoryCardProps {
  image: string;
  label: string;
  onClick?: () => void;
}

export const CategoryCard = ({ image, label, onClick }: CategoryCardProps) => {
  return (
    <div
      className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity w-full max-w-[243.96px] mx-auto min-h-[321.94px] gap-[13.94px]"
      onClick={onClick}
    >
      <div className="w-full aspect-square max-w-[243.96px] max-h-[243.96px] rounded-full overflow-hidden mx-auto">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-center w-full max-w-[250.93px] mx-auto min-h-[60px] font-poppins font-medium text-[clamp(24px,4vw,40px)] leading-none text-[var(--color-primary-600)] flex items-center justify-center">
        {label}
      </span>
    </div>
  );
};
