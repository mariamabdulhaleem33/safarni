import Rule from "./Rule"
type ValidationRulesProps = {
  isPasswordError: boolean
}
export default function ValidationRules({
  isPasswordError,
}: ValidationRulesProps) {
  return (
    <div className={`mb-6 space-y-1`}>
      <Rule isPasswordError={isPasswordError}>
        must be at least 8 characters
      </Rule>
      <Rule isPasswordError={isPasswordError}>
        must contain one special character
      </Rule>
    </div>
  )
}
