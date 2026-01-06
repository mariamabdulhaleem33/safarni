import Rule from "./Rule"
type ValidationRulesProps = {
  isPasswordError: boolean
  passwordValue: string
}
export default function ValidationRules({
  isPasswordError,
  passwordValue,
}: ValidationRulesProps) {
  return (
    <div className={`mb-6 space-y-1`}>
      <Rule isPasswordError={isPasswordError} passwordValue={passwordValue}>
        must be at least 8 characters
      </Rule>
      <Rule isPasswordError={isPasswordError} passwordValue={passwordValue}>
        must contain one special character
      </Rule>
    </div>
  )
}
