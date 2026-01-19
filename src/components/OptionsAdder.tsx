import { useRef } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function OptionsAdder({
  setOptions,
}: {
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // ref to collect the input data
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddOptions() {
    // get the value
    const value = inputRef.current?.value;

    if (value) {
      setOptions((prevOptions) => {
        if (
          prevOptions.some(
            (v) => v.trim().toLowerCase() === value.trim().toLowerCase(),
          )
        ) {
          toast.error(
            "The value already exists in the option, try with a different one!",
          );
          return prevOptions;
        }
        return [...prevOptions, value];
      });

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Add Options to the Field</Label>
      <div className="flex gap-2">
        <Input id="options" placeholder="Add your options" ref={inputRef} />
        <Button type="button" onClick={handleAddOptions}>
          Add
        </Button>
      </div>
    </div>
  );
}
