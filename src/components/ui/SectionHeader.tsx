import type { TSectoinHeaderProps } from "@/types/home.type"




const SectionHeader = ({ title, path }: TSectoinHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h5 className="text-[25px] font-medium text-[#111928] capitalize">{title}</h5>
            <button className="text-[#1E429F] text-[22px] font-medium cursor-pointer" onClick={() => console.log(path)}>View all</button>
        </div>
    )
}

export default SectionHeader
