import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateFormData } from "@/store/formdataSlice";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Trash } from "lucide-react";
import { OptionsAdder } from "./OptionsAdder";
import { toast } from "sonner";

export const NewFieldForm = () => {
  // local ui state
  const [inputType, setInputType] = useState<
    "input" | "select" | "textarea" | "radio" | "checkbox" | ""
  >("");

  const [options, setOptions] = useState<string[]>([]);

  // ref to clear the input
  const inputRef = useRef<HTMLInputElement>(null);

  // get both dispatch and formFieldData from store
  const dispatch = useAppDispatch();
  const formFieldData = useAppSelector((state) => state.value.fields);

  // submit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get data from form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // update to new data to add id
    const newData = {
      type: data["input-type"] as string,
      label: data.label as string,
      id: data.label.toString().toLowerCase().trim().split(" ").join(""),
      options,
    };

    // validation for label, already exist in the form
    if (
      !formFieldData
        .flatMap((field) => field.label.toLocaleLowerCase())
        .includes(newData.label.toLocaleLowerCase())
    ) {
      dispatch(updateFormData(newData));
    } else {
      toast.error(
        "The Provided Label already exists in the form. Try with a different name!",
      );
    }
    // reset the form
    handleFormReset();
  }

  // reset helper
  function handleFormReset() {
    setInputType("");
    setOptions([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // this variable helps to show options when user select radio and select
  const shouldHaveOptions = ["radio", "select"].includes(inputType);

  // delete option function using index
  function handleDeleteOption(i: number) {
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-background p-6 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Add New Field</h2>
          <p className="text-sm text-muted-foreground">
            Configure how this field will appear in the form.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            type="text"
            name="label"
            placeholder="Enter label for the field"
            required
            ref={inputRef}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="input-type">Input Field</Label>
          <Select
            value={inputType}
            onValueChange={(value) => setInputType(value as typeof inputType)}
            name="input-type"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type of input" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio Button</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* render options fields according to input type */}
        {shouldHaveOptions && (
          <div className="rounded-lg border bg-muted/30 p-4 flex flex-col gap-3">
            <OptionsAdder setOptions={setOptions} />
          </div>
        )}

        {options.length > 0 && (
          <div className="flex flex-col gap-2">
            {options.map((option, i) => (
              <div
                key={option + i}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
              >
                <span>{option}</span>
                <Trash
                  className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteOption(i)}
                />
              </div>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={!inputType}>
            Create Field
          </Button>
        </div>
      </form>
    </div>
  );
};
