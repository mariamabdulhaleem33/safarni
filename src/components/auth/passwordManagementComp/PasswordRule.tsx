import { CircleCheck } from "lucide-react";
import type { FC } from "react";


type PasswordRuleProps = {
    valid:boolean;
    message:string;
}

const PasswordRule:FC<PasswordRuleProps>=({valid, message})=>{
    return(
        <div className="flex items-center justify-center gap-2">
          <CircleCheck
            color={valid ? "#22C55E" : "#6B7280"}
            size={15}
          />
          <p
            className={`${
              valid ? "text-green-500" : "text-gray-500"
            } text-xs lg:text-lg`}
          >
            {message}
          </p>
        </div>
    )
}
export default PasswordRule;