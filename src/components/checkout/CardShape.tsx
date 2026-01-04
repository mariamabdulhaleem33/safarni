import cardImage from "../../assets/checkout/card_image.png";
const CardShape = () => {
  return (
    <div className="bg-[#F4F4F4] rounded-[30px] h-full w-full">
      <img src={cardImage} className="w-full h-full" alt="card image" />
    </div>
  );
};

export default CardShape;
