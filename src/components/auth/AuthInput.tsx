import type { ReactNode } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

export default function AuthInput({
  label,
  type,
  placeholder,
  icon,
  register,
  error,
}: {
  label: string
  type: string
  placeholder: string
  icon: ReactNode
  register: UseFormRegisterReturn
  error: FieldError | undefined
}) {
  const ERROR_STYLE = "text-red-500 text-xs mt-1"

  return (
    <div className="mb-4.5 sm:mb-4">
      <label className="label">{label}</label>
      <div className="relative">
        <div className="input-icon-container">
          <div className="p-1">{icon}</div>
        </div>
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="auth-input"
        />
      </div>
      {error && <p className={ERROR_STYLE}>{error.message}</p>}
    </div>
  )
}
