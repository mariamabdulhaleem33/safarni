const CardShape = ({ img }: { img: string }) => {
  return (
    <div className="bg-[#F4F4F4] rounded-[30px] h-120 md:h-145 w-full">
      <img src={img} className="w-full h-full" alt="card image" />
    </div>
  );
};

export default CardShape;
