export type ForgotPassFormData = {
  email: string;
};

export type ForgotPassResponse={
  status:string;
  message:string;
  data:{
    message:string;
    user_id:number
  }
}

export type OTPFormValues = {
  otp: string;
};

export type NewPassFormData = {
  newPassword: string;
  confirmPassword: string;
};
