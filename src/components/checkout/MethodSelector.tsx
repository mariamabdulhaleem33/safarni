import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import paypal_image from "../../assets/checkout/logos_paypal.png";
import mast_image from "../../assets/checkout/Mastercard.png";
import visa_image from "../../assets/checkout/Visa.png";
type Props = { selectedValue: string; setSelectedValue: (m: string) => void };
const payment_methods = [
  {
    id: "paypal",
    label: "Paypal",
    logo: paypal_image,
    style: "text-[24px] font-medium text-[#4B5563]",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    logo: mast_image,
    style: "text-[24px] font-medium text-[#4B5563]",
  },
  {
    id: "visa",
    label: "Visa",
    logo: visa_image,
    style: "text-[24px] font-medium text-[#4B5563]",
  },
];
export const MethodSelector = ({ selectedValue, setSelectedValue }: Props) => (
  <div>
    <h2 className="text-[26px] text-center font-medium text-[#111928] mb-8">
      Payment Method
    </h2>
    <div>
      <p className="text-[#374151] text-[22px] mb-6">Add Your Payment Method</p>
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="flex flex-wrap gap-4"
      >
        {payment_methods.map((method) => (
          <div key={method.id} className="relative">
            <RadioGroupItem
              value={method.id}
              id={method.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={method.id}
              className="flex items-center gap-2 px-4 py-2 bg-[#F3F4F6] border rounded-full cursor-pointer transition-all 
                peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 
                hover:bg-slate-50 border-slate-200"
            >
              <img
                src={method.logo}
                alt={method.label}
                className="h-4 w-[30px] object-contain"
              />
              <span className={`${method.style}`}>{method.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  </div>
);
