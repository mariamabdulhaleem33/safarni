export type ForgotPassFormData = {
  email: string;
};

export type ForgotPassResponse = {
  status: string;
  message: string;
  data: {
    message: string;
    user_id: number;
  };
};

export type OTPFormValues = {
  user_id?: number;
  otp: string;
};

export type OTPResponse = {
  message: number;
  user_id: number;
  token: string;
};

export type NewPassFormData = {
  user_id?: number;
  otp?: string;
  password: string;
  password_confirmation: string;
};

export type NewPassResponse = {
  status: string;
  message: string;
  data: {
    message: string;
  };
};
