import { MuiOtpInput } from "mui-one-time-password-input";
import { type FC } from "react";

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const OTPInput: FC<OTPInputProps> = ({ value, onChange }) => {
  const TextFieldsProps = {
    sx: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        fontSize: "20px",
        width: "56px",
        height: "56px",

        "@media (max-width: 1024px)": {
          fontSize: "16px",
          width: "44px",
          height: "44px",
        },

        "& fieldset": {
          borderColor: "#1E429F",
        },

        "&:hover fieldset": {
          borderColor: "#1E429F",
        },

        "&.Mui-focused fieldset": {
          borderColor: "#1E429F",
          boxShadow: "0 0 0 3px rgba(30, 66, 159, 0.25)",
        },
      },
    },
  };

  return (
    <MuiOtpInput
      length={4}
      value={value}
      onChange={onChange}
      TextFieldsProps={TextFieldsProps}
    />
  );
};

export default OTPInput;
