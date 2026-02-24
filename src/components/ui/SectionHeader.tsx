import type { TSectoinHeaderProps } from "@/types/home.type"
import React from "react"
import { useNavigate } from "react-router-dom"




const SectionHeader = React.memo(({ title, path }: TSectoinHeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center">
            <h5 className="text-[25px] font-medium text-gray-900 capitalize">{title}</h5>
            <button className="text-[#1E429F] text-[22px] font-medium cursor-pointer" onClick={() => navigate(path)}>View all</button>
        </div>
    )
})

export default SectionHeader
