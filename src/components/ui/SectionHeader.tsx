import type { TSectoinHeaderProps } from "@/types/home.type"
import React from "react"




const SectionHeader = React.memo(({ title, path }: TSectoinHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h5 className="text-[25px] font-medium text-gray-900 capitalize">{title}</h5>
            <button className="text-[#1E429F] text-[22px] font-medium cursor-pointer" onClick={() => console.log(path)}>View all</button>
        </div>
    )
})

export default SectionHeader
