import Activity from "./Activity"

export default function TopActivities() {
  return (
    <div>
      <h3 className="font-poppins font-medium text-[25px] mb-2">
        Top Activities
      </h3>
      <div className="flex gap-3 sm:gap-5 lg:flex-row flex-col">
        <Activity />
        <Activity />
        <Activity />
        <Activity />
      </div>
    </div>
  )
}
