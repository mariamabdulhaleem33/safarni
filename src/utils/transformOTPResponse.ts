import type { OTPResponse } from "@/types/PasswordManagement.types"

export const transformOTPResponse = (data:any) =>{
    const FormattedData:OTPResponse ={
        message:data.message,
        token:data.data.token,
        user_id:data.data.user.id,
    }
    return FormattedData
}