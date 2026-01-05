import Rule from "./Rule"

export default function ValidationRules() {
  return (
    <div className="mb-6 ">
      <Rule>must be at least 8 characters</Rule>
      <Rule>must contain one special character</Rule>
    </div>
  )
}
