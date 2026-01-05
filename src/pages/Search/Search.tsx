
import SearchItemCard from '@/components/Search/searchItemCard'
import SearchInput from '../../components/Search/searchInput'
import BackButton from '../../components/backButton'

export default function Search() {
    return (
        <>
         <div className="flex flex-row items-center gap-2 p-4">
               <BackButton /> 
               <SearchInput />
            </div>
            <SearchItemCard />
        </>
  )
}
