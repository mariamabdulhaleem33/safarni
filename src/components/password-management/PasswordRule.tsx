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
            size={20}
          />
          <p
            className={`text-md ${
              valid ? "text-green-500" : "text-gray-500"
            } `}
          >
            {message}
          </p>
        </div>
    )
}
export default PasswordRule;