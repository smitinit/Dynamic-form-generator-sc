import { useRef } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export function OptionsAdder({
  setOptions,
}: {
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddOptions() {
    const value = inputRef.current?.value;

    if (value) {
      setOptions((prevOptions) => [...prevOptions, value]);
      if (inputRef.current) {
        inputRef.current.value = "";
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
