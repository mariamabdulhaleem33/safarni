import { useNavigate , useParams } from "react-router-dom"

const PickUpButton = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  return (
    <button
      onClick={() => navigate(`/cars/${id}/pick-up`)}
      className="
        w-full
        bg-[#1a3a8a]
        hover:bg-[#152e6d]
        text-white
        font-medium
        py-3
        rounded-lg
        transition
      "
    >
      Pick Up
    </button>
  )
}

export default PickUpButton
