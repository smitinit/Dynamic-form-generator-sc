import type { FormFieldsState } from "@/store/formdataSlice";

import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Textarea } from "./ui/textarea";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";

export const RenderField = ({ formField }: { formField: FormFieldsState }) => {
  // destructure data
  const { type, label, id, options, required } = formField;

  switch (type) {
    case "input":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Label htmlFor={id}>{label}</Label>
            {required && <span className=" text-red-600 ">*</span>}
          </div>

          <Input id={id} name={id} required={required} />
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-2 w-50">
          <div className="flex gap-2">
            <Label htmlFor={id}>{label}</Label>
            {required && <span className=" text-red-600 ">*</span>}
          </div>

          <Textarea className="w-full" id={id} name={id} required={required} />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label>{label}</Label>
            {required && <span className=" text-red-600 ">*</span>}
          </div>

          <NativeSelect id={id} name={id} required={required}>
            <NativeSelectOption value="">Select {label}</NativeSelectOption>
            {options?.map((option) => (
              <NativeSelectOption key={option} value={option}>
                {option}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox id={id} name={id} value="true" required={required} />

          <div className="flex gap-2">
            <Label htmlFor={id}>{label}</Label>
            {required && <span className=" text-red-600 ">*</span>}
          </div>
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label htmlFor={id}>{label}</Label>
            {required && <span className=" text-red-600 ">*</span>}
          </div>

          <RadioGroup name={id} id={id} required={required}>
            {options?.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} id={`${id}-${option}`} />
                <Label htmlFor={`${id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    default:
      return null;
  }
};
